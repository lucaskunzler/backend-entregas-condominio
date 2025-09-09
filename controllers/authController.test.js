const authController = require('./authController');
const { JWT_SECRET } = require('../config');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

jest.mock('../models/User');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('authController', () => {
	let req, res;

	// Factory function for creating mock response object
	function mockResponse() {
		return {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		};
	}

	beforeEach(() => {
		req = { body: {} };
		res = mockResponse();
		jest.clearAllMocks();
		User.findOne = jest.fn();
		User.mockImplementation(userFactory);
	});

	// Factory function for creating user mock
	function userFactory(userData) {
		return {
			...userData,
			save: jest.fn().mockResolvedValue(),
			_id: 'userId',
			role: userData.role || 'morador'
		};
	}

	test('register should create a new user', async () => {
		req.body = { nome: 'Lucas', email: 'lucas@test.com', senha: '123456', role: 'morador' };
		bcrypt.hash.mockResolvedValue('hashedSenha');
		jwt.sign.mockReturnValue('token123');

		await authController.register(req, res);

		expect(bcrypt.hash).toHaveBeenCalledWith('123456', 10);
		expect(jwt.sign).toHaveBeenCalledWith({ id: 'userId', role: 'morador' }, JWT_SECRET);
		expect(res.json).toHaveBeenCalledWith({ token: 'token123', role: 'morador' });
	});

	test('login should authenticate user and return token', async () => {
		req.body = { email: 'lucas@test.com', senha: '123456' };
		const user = { _id: 'userId', role: 'morador', senha: 'hashedSenha' };
		User.findOne.mockResolvedValue(user);
		bcrypt.compare.mockResolvedValue(true);
		jwt.sign.mockReturnValue('token123');

		await authController.login(req, res);

		expect(User.findOne).toHaveBeenCalledWith({ email: 'lucas@test.com' });
		expect(bcrypt.compare).toHaveBeenCalledWith('123456', 'hashedSenha');
		expect(jwt.sign).toHaveBeenCalledWith({ id: 'userId', role: 'morador' }, JWT_SECRET);
		expect(res.json).toHaveBeenCalledWith({ token: 'token123', role: 'morador' });
	});

	test('login should return 401 for invalid email', async () => {
		req.body = { email: 'wrong@test.com', senha: '123456' };
		User.findOne.mockResolvedValue(null);

		await authController.login(req, res);

		expect(res.status).toHaveBeenCalledWith(401);
		expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
	});

	test('login should return 401 for invalid password', async () => {
		req.body = { email: 'lucas@test.com', senha: 'wrongpass' };
		const user = { _id: 'userId', role: 'morador', senha: 'hashedSenha' };
		User.findOne.mockResolvedValue(user);
		bcrypt.compare.mockResolvedValue(false);

		await authController.login(req, res);

		expect(res.status).toHaveBeenCalledWith(401);
		expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
	});
});

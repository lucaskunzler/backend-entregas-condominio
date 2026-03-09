const { JWT_SECRET } = require('../config');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  console.log(`[Auth] Login attempt for email: ${email}`);
  const user = await User.findOne({ email });
  if (!user) {
    console.warn(`[Auth] Login failed - user not found: ${email}`);
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const valid = await bcrypt.compare(senha, user.senha);
  if (!valid) {
    console.warn(`[Auth] Login failed - wrong password for: ${email}`);
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);
  console.log(`[Auth] Login successful for: ${email} (${user.role})`);
  res.json({ token, role: user.role });
};

exports.register = async (req, res) => {
  const { nome, email, senha, role } = req.body;
  console.log(`[Auth] Registering new user: ${email} (${role || 'morador'})`);
  const hashedSenha = await bcrypt.hash(senha, 10);
  const user = new User({ nome, email, senha: hashedSenha, role: role || 'morador' });
  await user.save();
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);
  console.log(`[Auth] User registered successfully: ${email} (id: ${user._id})`);
  res.json({ token, role: user.role });
};

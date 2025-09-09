const { JWT_SECRET } = require('../config');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(senha, user.senha);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);
  res.json({ token, role: user.role });
};

exports.register = async (req, res) => {
  const { nome, email, senha, role } = req.body;
  const hashedSenha = await bcrypt.hash(senha, 10);
  const user = new User({ nome, email, senha: hashedSenha, role: role || 'morador' });
  await user.save();
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);
  res.json({ token, role: user.role });
};
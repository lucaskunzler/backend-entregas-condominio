const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/entregas', { useNewUrlParser: true, useUnifiedTopology: true });

// User Schema
const userSchema = new mongoose.Schema({
  email: String,
  senha: String,
  role: { type: String, enum: ['porteiro', 'morador'], default: 'morador' }
});
const User = mongoose.model('User', userSchema);

// JWT secret
const JWT_SECRET = 'your_jwt_secret';

// Middleware to verify JWT
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });
  const [, token] = authHeader.split(' ');
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.user = decoded;
    next();
  });
}

// Login route
app.post('/api/login', async (req, res) => {
  const { email, senha } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(senha, user.senha);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);
  res.json({ token, role: user.role });
});

// Register route
app.post('/api/register', async (req, res) => {
  const { email, senha, role } = req.body;
  const hashedSenha = await bcrypt.hash(senha, 10);
  const user = new User({ email, senha: hashedSenha, role: role || 'morador' });
  await user.save();
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);
  res.json({ token, role: user.role });
});

// Dashboard routes
app.get('/api/dashboard/porteiro', authMiddleware, (req, res) => {
  if (req.user.role !== 'porteiro') return res.status(403).json({ error: 'Forbidden' });
  res.json({ dados: 'Dados para o painel do porteiro' });
});

app.get('/api/dashboard/morador', authMiddleware, (req, res) => {
  if (req.user.role !== 'morador') return res.status(403).json({ error: 'Forbidden' });
  res.json({ dados: 'Dados para o painel do morador' });
});

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
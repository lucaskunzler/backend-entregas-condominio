
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.warn(`[Auth] No token provided on ${req.method} ${req.path}`);
    return res.status(401).json({ error: 'No token provided' });
  }

  const [, token] = authHeader.split(' ');

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.warn(`[Auth] Invalid token on ${req.method} ${req.path}: ${err.message}`);
      return res.status(401).json({ error: 'Invalid token' });
    }
    console.log(`[Auth] Token valid for user: ${decoded.id} (${decoded.role})`);
    req.user = decoded;
    next();
  });
}

module.exports = authMiddleware;

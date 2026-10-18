const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

app.use(express.json());

const users = [{ username: 'admin', password: 'password123' }];

const movies = [
  { id: 1, title: 'Interstellar' },
  { id: 2, title: 'The Dark Knight' },
  { id: 3, title: 'Inception' },
];

// Verifies the Bearer token on protected routes
function authenticateToken(req, res, next) {
  const header = req.headers.authorization;
  const token = header && header.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      const message = err.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token';
      return res.status(403).json({ message });
    }
    req.user = payload;
    next();
  });
}

app.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ message: 'Login successful', token });
});

app.get('/movies', authenticateToken, (req, res) => {
  res.json(movies);
});

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
});

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

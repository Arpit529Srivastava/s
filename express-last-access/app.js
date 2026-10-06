const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const RECENT_DAYS = 10;

const daysAgo = (n) => new Date(Date.now() - n * 24 * 60 * 60 * 1000);

const users = [
  { username: 'Alwin', role: 'admin', lastAccessDate: daysAgo(2) },
  { username: 'Veena', role: 'editor', lastAccessDate: daysAgo(7) },
  { username: 'Geetha', role: 'viewer', lastAccessDate: daysAgo(10) },
  { username: 'Ravi', role: 'viewer', lastAccessDate: daysAgo(15) },
  { username: 'Meena', role: 'editor', lastAccessDate: daysAgo(30) },
];

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.get('/', (req, res) => {
  res.send(`users: ${users.map((u) => u.username).join(' ')}`);
});

app.get('/users', (req, res) => {
  res.json(users);
});

// Users who accessed the system within the last 10 days
app.get('/users/recent', (req, res) => {
  const cutoff = daysAgo(RECENT_DAYS);
  res.json(users.filter((u) => u.lastAccessDate >= cutoff));
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

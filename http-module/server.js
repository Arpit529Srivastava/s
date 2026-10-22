const http = require('http');

const PORT = 8080;

const routes = {
  '/': 'Welcome to the Home Page!',
  '/about': 'About Us: We are developers.',
  '/contact': 'Contact Us at: contact@example.com',
  '/services': 'We provide Development Service.',
  '/help': 'Help Page: How can we assist you today?',
};

const server = http.createServer((req, res) => {
  const pathname = req.url.split('?')[0];
  const message = routes[pathname];

  if (message !== undefined) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(message);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = server;

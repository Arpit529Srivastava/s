const express = require('express');
const morgan = require('morgan');
const winston = require('winston');

const app = express();
const PORT = process.env.PORT || 3000;

// Winston: application logger writing to console and a file
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => `${level}: ${message} {"timestamp":"${timestamp}"}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' }),
  ],
});

// Morgan "combined" format is piped through Winston so it lands in the console and log file
const winstonStream = {
  write: (message) => logger.info(message.trim()),
};

app.use(express.json());
app.use(morgan('tiny'));
app.use(morgan('combined', { stream: winstonStream }));

// Custom middleware: log method, URL and timestamp of every request
app.use((req, res, next) => {
  logger.info(`Incoming ${req.method} request at ${req.originalUrl} - ${new Date().toISOString()}`);
  next();
});

const orders = [
  { customer: 'Alice', item: 'Apple', quantity: 5 },
  { customer: 'Bob', item: 'Banana', quantity: 3 },
];

app.get('/orders', (req, res) => {
  logger.info('Fetched all orders.');
  res.json(orders);
});

app.post('/orders', (req, res) => {
  const { customer, item, quantity } = req.body || {};
  const missing = (v) => v === undefined || v === null || v === '';

  if (missing(customer) || missing(item) || missing(quantity)) {
    logger.warn('Invalid order: Missing fields.');
    return res.status(400).json({ error: 'Invalid order: Missing fields.' });
  }

  const order = { customer, item, quantity, createdAt: new Date().toISOString() };
  orders.push(order);

  logger.info(`New order placed by ${customer} for ${quantity} ${item}.`);
  res.status(201).json({ message: 'Order placed successfully', order });
});

// Unknown routes
app.use((req, res) => {
  logger.warn(`Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: 'Route not found' });
});

// Error handler (also covers malformed JSON bodies)
app.use((err, req, res, next) => {
  logger.error(`${err.message}`);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  logger.info(`Order management server running on port ${PORT}`);
});

const express = require('express');
const connectDB = require('./db');
const Product = require('./product.model');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Add a new product
app.post('/', async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});

// Retrieve all products
app.get('/allProducts', async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

// 404 for unmatched paths
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
});

// General error handler
app.use((err, req, res, next) => {
  let status = err.status || 500;
  if (err.name === 'ValidationError') status = 400;
  if (err.code === 11000) status = 409;
  res.status(status).json({ error: err.message || 'Internal server error' });
});

connectDB()
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });

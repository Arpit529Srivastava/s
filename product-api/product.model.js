const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productNo: { type: Number, required: true, unique: true },
  productName: { type: String, required: true, trim: true },
  quantity: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
});

module.exports = mongoose.model('Product', productSchema);

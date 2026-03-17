const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    brand: String,
    stock: Number,
    category: String,
    description: String,   // 👈 NEW
    image: String          // 👈 NEW
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
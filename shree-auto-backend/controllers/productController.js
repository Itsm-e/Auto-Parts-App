const Product = require("../models/product");

// Create Product
exports.createProduct = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { name, price, category, description } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Image file missing"
      });
    }

    const cloudinary = require("../config/cloudinary");

    const result = await cloudinary.uploader.upload(
      req.file.path
    );

    const product = new Product({
      name,
      price,
      category,
      description,
      image: result.secure_url
    });

    await product.save();

    res.status(201).json(product);

  } catch (error) {
  console.error("CREATE PRODUCT ERROR:");
  console.error(error);

  res.status(500).json({
    message: "Product creation failed",
    error: error.message
  });
}
};

// Get All Products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Product
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

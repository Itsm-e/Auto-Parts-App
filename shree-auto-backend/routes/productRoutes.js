const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const router = express.Router();

// CREATE (with image upload)
router.post("/", authMiddleware, upload.single("image"), createProduct);

// UPDATE
router.put("/:id", authMiddleware, updateProduct);

// DELETE
router.delete("/:id", authMiddleware, deleteProduct);

// GET ALL
router.get("/", getProducts);

// GET SINGLE
router.get("/:id", getSingleProduct);

module.exports = router;
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

const PORT = process.env.PORT || 5000;


const app = express();


// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);


// Test route
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Shree Auto API is running 🚀"
  });
});

// Debug env
console.log("ENV CHECK:");
console.log("MONGO_URI:", process.env.MONGO_URI ? "FOUND" : "MISSING");
console.log("CLOUD_NAME:", process.env.CLOUD_NAME ? "FOUND" : "MISSING");
console.log("API_KEY:", process.env.API_KEY ? "FOUND" : "MISSING");
console.log("SECRET:", process.env.CLOUDINARY_API_SECRET ? "FOUND" : "MISSING");

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err));

// Start server

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
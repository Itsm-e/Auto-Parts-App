const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER ADMIN
exports.registerAdmin = async (req, res) => {
  try {

    const { name, email, password, secretCode } = req.body;

    // 🔐 CHECK SECRET CODE
    if (secretCode !== process.env.ADMIN_SECRET_CODE) {
      return res.status(403).json({
        message: "Unauthorized: Invalid admin code"
      });
    }

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      name,
      email,
      password: hashedPassword
    });

    await admin.save();

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Admin registered successfully",
      token,
      admin
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// LOGIN ADMIN
exports.loginAdmin = async (req, res) => {
  try {

    const { email, password } = req.body;

    // Find admin
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({
        message: "Invalid email"
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email
      }
    });

  } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
};
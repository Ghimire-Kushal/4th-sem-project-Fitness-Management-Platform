const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// =========================
// REGISTER USER
// =========================
const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      phone,
    } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    // Check existing userr
    const userExists = await User.findOne({
      email,
    });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "member",
      phone,
    });

    // Generate token
    const token = generateToken(
      user._id,
      user.role
    );

    // Response
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// =========================
// LOGIN USER
// =========================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter email and password",
      });
    }

    // Find user
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Generate token
    const token = generateToken(
      user._id,
      user.role
    );

    // Response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
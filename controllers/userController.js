const catchAsync = require("express-async-handler");
const bcrypt = require("bcrypt");
const { AppError } = require("../middleware/errorMiddleware");
const User = require("../models/userModel");
const Listing = require("../models/listingModel");
const generateToken = require("../util/generateToken");
const mongoose = require("mongoose");
// @route   GET /api/users
// @desc    Get all users
// @access  Private (Admin Only)
const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// @route   POST /api/register
// @desc    Register user
// @access  Public
const registerUser = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new AppError("Please provide all necessary fields.", 400);
  }
  const sameName = await User.findOne({ name });
  if (sameName) {
    throw new AppError("Username is taken by another user.", 400);
  }
  const sameEmail = await User.findOne({ email });
  if (sameEmail) {
    throw new AppError("Email is taken by another user.", 400);
  }

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    isAdmin: false,
  });

  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    throw new AppError("Invalid user data.", 403);
  }
});

const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    throw new AppError("Invalid credentials.", 401);
  }
});

const getUserProfile = catchAsync(async (req, res) => {
  const { userId } = req.params;
  if (!mongoose.isValidObjectId(userId)) {
    throw new AppError("Not a valid user ID.", 400);
  }
  const user = await User.findById(userId).select(["-password", "-isAdmin"]);
  const listings = await Listing.find({ author: user._id });
  if (user && listings) {
    res.status(200).json({
      user,
      listings,
    });
  } else {
    throw new AppError("Could not retrieve user or listing data.", 500);
  }
});

const getUser = (req, res) => {
  res.status(200).json(req.user);
};

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  getUser,
  getUserProfile,
};

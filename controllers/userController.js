const catchAsync = require("express-async-handler");
const bcrypt = require("bcrypt");
const { AppError } = require("../middleware/errorMiddleware");
const User = require("../models/userModel");
const Listing = require("../models/listingModel");
const mongoose = require("mongoose");

// @desc    Get all users
// @route   GET /api/users
// @access  Private (Admin Only)
const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// @desc    Register user with name, email and password
// @route   POST /api/register
// @access  Public
const registerUser = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new AppError("Please provide all necessary fields.", 400);
  }
  const sameName = await User.findOne({ name });
  if (sameName) {
    throw new AppError("That username is taken by another user.", 400);
  }
  const sameEmail = await User.findOne({ email });
  if (sameEmail) {
    throw new AppError("That email is taken by another user.", 400);
  }
  // Generate hashed password and store it as the user's password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    isAdmin: false,
  });
  if (user) {
    res.status(201).json(user.toClient());
  } else {
    throw new AppError("Invalid user data.", 403);
  }
});

// @desc    Log in user with email and password
// @route   POST /api/users/login
// @access  Public
const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json(user.toClient());
  } else {
    throw new AppError("Invalid credentials.", 401);
  }
});

// @desc    Update a user's avatar
// @route   PUT /api/users/me/avatar
// @access  Private (to current user)
const updateUserAvatar = catchAsync(async (req, res) => {
  const { _id: userId } = req.user;
  const { avatarUrl } = req.body;
  const user = await User.findByIdAndUpdate(
    userId,
    { avatarUrl },
    { returnDocument: "after" }
  ).select(["-password", "-isAdmin"]);
  if (user) {
    res.status(200).json(user.toClient());
  } else {
    throw new AppError("Something went wrong.", 500);
  }
});

// @desc    Retrieve current user's data
// @route   GET /api/users/me
// @access  Private (to current user)
const getUser = (req, res) => {
  res.status(200).json(req.user.toClient());
};

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  getUser,
  updateUserAvatar,
};

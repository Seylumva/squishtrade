const catchAsync = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { AppError } = require("./errorMiddleware");

// Allows users to access the page
const protected = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(id).select("-password");
      req.user = user;
      next();
    } catch (err) {
      throw new AppError("Not authorized.", 401);
    }
  }

  if (!token) {
    throw new AppError("Not authorized, no token.", 401);
  }
});

// Only allows admins to access the page
const adminProtected = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: id });
    if (!user.isAdmin) {
      throw new AppError("Not an administrator.", 403);
    }
    req.user = user;
    next();
  }

  if (!token) {
    throw new AppError("Not authorized, no token.", 401);
  }
});

module.exports = {
  protected,
  adminProtected,
};

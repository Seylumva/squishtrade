const catchAsync = require("express-async-handler");
const mongoose = require("mongoose");
const { AppError } = require("../middleware/errorMiddleware");
const Listing = require("../models/listingModel");
const User = require("../models/userModel");

// @desc    Returns all listings in the database
// @route   GET /api/listings/all
// @access  Public
const getAllListings = catchAsync(async (req, res) => {
  const allListings = await Listing.find();
  if (allListings) {
    res.status(200).json(allListings);
  } else {
    throw new AppError("No listings found.", 404);
  }
});

// @desc    Retrieves a single
// @route   GET /api/listings/:id
// @access  Public
const getListing = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    throw new AppError("Not a valid ID.", 400);
  }
  // Only provide listing with necessary user information
  const listing = await Listing.findById(id).populate("author", [
    "-email",
    "-password",
    "-isAdmin",
  ]);
  if (listing) {
    res.status(200).json(listing.toClient());
  } else {
    throw new AppError("No listing found.", 404);
  }
});

// @desc    Get the currently logged in user's listings
// @route   GET /api/listings/
// @access  Private (to current user)
const getLoggedInUsersListings = catchAsync(async (req, res) => {
  const { _id: userId } = req.user;
  const userListings = await Listing.find({ author: userId });
  if (userListings) {
    res.status(200).json(userListings);
  } else {
    throw new AppError("No listings found.", 404);
  }
});

// @desc    Create a new listing and attach the current user's id
// @route   POST /api/listings/
// @access  Private (to current user)
const createListing = catchAsync(async (req, res) => {
  const { _id: userId } = req.user;
  const { title, description, price, type, condition, images } = req.body;
  if (!title || !description || !price || !type || !condition) {
    throw new AppError("Please provide all the necessary fields.", 400);
  }
  // No images left (min. 1)
  if (!images.length) {
    throw new AppError("You must provide an image.", 401);
  }
  const newListing = await Listing.create({
    title,
    description,
    price,
    type,
    condition,
    images,
    author: userId,
  });
  if (newListing) {
    res.status(201).json(newListing.toClient());
  } else {
    throw new AppError("Invalid listing data.", 400);
  }
});

// @desc    Update listing with the provided id
// @route   PUT /api/listings/:id
// @access  Private (to current user)
const updateListing = catchAsync(async (req, res) => {
  const { _id: userId } = req.user;
  const { id: listingId } = req.params;
  const formData = req.body;
  const matchedListing = await Listing.findById(listingId);
  if (!userId) {
    throw new AppError("No credentials", 401);
  }
  if (!matchedListing) {
    throw new AppError("No listing found.", 404);
  }
  if (!userId.equals(matchedListing.author)) {
    throw new AppError("You're not authorized to edit this post.", 403);
  }
  const updatedListing = await Listing.findByIdAndUpdate(listingId, formData, {
    returnDocument: "after",
  });
  if (updatedListing) {
    res.status(200).json(updatedListing.toClient());
  } else {
    throw new AppError("Unable to edit listing.", 500);
  }
});

// @desc    Delete listing with the provided id
// @route   DELETE /api/listings/:id
// @access  Private (to current user)
const deleteListing = catchAsync(async (req, res) => {
  const { _id: userId } = req.user;
  const { id: listingId } = req.params;
  const listingToRemove = await Listing.findById(listingId);
  if (!userId.equals(listingToRemove.author)) {
    throw new AppError("Not authorized.", 403);
  }
  const listingDeleted = await Listing.findByIdAndDelete(listingId);
  if (listingDeleted) {
    res.status(200).json(listingDeleted.toClient());
  } else {
    throw new AppError("Can't delete listing.", 400);
  }
});

// @desc    Retrieve a user's public profile and listings
// @route   GET /api/listings/from?userId
// @access  Public
const getUsersListingsAndProfile = catchAsync(async (req, res) => {
  const { userId } = req.query;
  if (!mongoose.isValidObjectId(userId)) {
    throw new AppError("Not a valid user ID.", 400);
  }
  const user = await User.findOne({ _id: userId });
  const listings = await Listing.find({
    author: userId,
    isPublic: true,
  });
  if (listings && user) {
    res.status(200).json({
      listings,
      user: user.toClientNoToken(),
    });
  } else {
    throw new AppError("Could not retrieve user or listing data.", 500);
  }
});

module.exports = {
  getAllListings,
  getLoggedInUsersListings,
  getListing,
  createListing,
  deleteListing,
  updateListing,
  getUsersListingsAndProfile,
};

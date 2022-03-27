const catchAsync = require("express-async-handler");
const mongoose = require("mongoose");
const { AppError } = require("../middleware/errorMiddleware");
const Listing = require("../models/listingModel");

const getAllListings = catchAsync(async (req, res) => {
  const allListings = await Listing.find().populate("author", [
    "-password",
    "-isAdmin",
    "-email",
  ]);
  if (allListings) {
    res.status(200).json(allListings);
  } else {
    throw new AppError("No listings found.", 404);
  }
});

const getListing = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    throw new AppError("Not a valid ID.", 400);
  }
  const listing = await Listing.findById(id).populate("author", [
    "-password",
    "-isAdmin",
  ]);
  if (listing) {
    res.status(200).json(listing);
  } else {
    throw new AppError("No listing found.", 404);
  }
});

const getUserListings = catchAsync(async (req, res) => {
  if (!req.user) {
    throw new AppError("Invalid user.", 400);
  }
  const { _id: id } = req.user;
  const userListings = await Listing.find({ author: id });
  if (userListings) {
    res.status(200).json(userListings);
  } else {
    throw new AppError("No listings found.", 404);
  }
});

const createListing = catchAsync(async (req, res) => {
  if (!req.user) {
    throw new AppError("You must create an account to make a listing.", 403);
  }
  const { _id: userId } = req.user;

  const { title, description, price, type, condition, images } = req.body;
  if (!title || !description || !price || !type || !condition) {
    throw new AppError("Please provide all the necessary fields.", 400);
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
    res.status(201).json(newListing);
  } else {
    throw new AppError("Invalid listing data.", 400);
  }
});

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
    res.status(200).json(updatedListing);
  } else {
    throw new AppError("Unable to edit listing.", 500);
  }
});

const deleteListing = catchAsync(async (req, res) => {
  const { _id: userId } = req.user;
  const { id: listingId } = req.params;
  const listingToRemove = await Listing.findById(listingId);

  if (!userId.equals(listingToRemove.author)) {
    throw new AppError("Not authorized.", 403);
  }
  const listingDeleted = await Listing.findByIdAndDelete(listingId);
  if (listingDeleted) {
    res.status(200).json(listingDeleted);
  } else {
    throw new AppError("Can't delete listing.", 400);
  }
});

module.exports = {
  getAllListings,
  getUserListings,
  getListing,
  createListing,
  deleteListing,
  updateListing,
};

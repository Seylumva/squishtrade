const mongoose = require("mongoose");

const listingSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["Standard", "Stack", "Squeezemallow", "Tin"],
    required: true,
  },
  condition: {
    type: String,
    enum: ["Brand New", "Like New", "Used"],
    required: true,
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Listing", listingSchema);

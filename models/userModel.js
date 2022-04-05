const generateToken = require("../util/generateToken");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 12,
    },
    email: {
      type: String,
      required: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    avatarUrl: {
      type: String,
      default: "Squishtrade/default_avatar_d61hqi.png",
    },
  },
  { timestamps: true }
);

// Method to return only the necessary information
// to the signed in user's client with a token
userSchema.methods.toClient = function () {
  return {
    id: this._id,
    name: this.name,
    avatarUrl: this.avatarUrl,
    email: this.email,
    token: generateToken(this.id),
  };
};

// Method to return profile information when requesting
// a user's profile from the client
userSchema.methods.toClientNoToken = function () {
  return {
    id: this._id,
    name: this.name,
    avatarUrl: this.avatarUrl,
  };
};

module.exports = mongoose.model("User", userSchema);

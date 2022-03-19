const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("User", userSchema);

const express = require("express");
const { protected, adminProtected } = require("../middleware/authMiddleware");
const {
  getAllUsers,
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userController");
const router = express.Router();

router.route("/").get(adminProtected, getAllUsers);

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/me").get(protected, getUser);

module.exports = router;

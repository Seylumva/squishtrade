const express = require("express");
const {
  createListing,
  getLoggedInUsersListings,
  getAllListings,
  getListing,
  deleteListing,
  updateListing,
  getUsersListingsAndProfile,
} = require("../controllers/listingController");
const { protected } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/all").get(getAllListings);

router.route("/from").get(getUsersListingsAndProfile);

router
  .route("/")
  .get(protected, getLoggedInUsersListings)
  .post(protected, createListing);

router
  .route("/:id")
  .get(getListing)
  .delete(protected, deleteListing)
  .put(protected, updateListing);

module.exports = router;

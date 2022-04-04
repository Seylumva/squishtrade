const express = require("express");
const {
  createListing,
  getUserListings,
  getAllListings,
  getListing,
  deleteListing,
  updateListing,
} = require("../controllers/listingController");
const { protected, adminProtected } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/all").get(getAllListings);

router
  .route("/")
  .get(protected, getUserListings)
  .post(protected, createListing);

router
  .route("/:id")
  .get(getListing)
  .delete(protected, deleteListing)
  .put(protected, updateListing);

module.exports = router;

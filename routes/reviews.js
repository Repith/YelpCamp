const express = require("express");
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");
const {
  validateReview,
  isLoggedIn,
  validateReviewAuthor,
} = require("../middleware");
const Campground = require("../models/campground");
const Review = require("../models/review");
const reviews = require("../controllers/reviews");

// Adding and deleting reviews
router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  validateReviewAuthor,
  catchAsync(reviews.deleteReview)
);

module.exports = router;

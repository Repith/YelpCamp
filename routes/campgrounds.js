const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const campgrounds = require("../controllers/campgrounds");

const Campground = require("../models/campground");

const {
  isLoggedIn,
  validateAuthor,
  validateCampground,
} = require("../middleware");

// Getting index of campgrounds
router.get("/", catchAsync(campgrounds.index));

// Adding new campground
router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router.post(
  "/",
  isLoggedIn,
  validateCampground,
  catchAsync(campgrounds.createCampground)
);

// Rendering a campground page
router.get("/:id", catchAsync(campgrounds.showCampground));

// Edit page and edit request
router.get(
  "/:id/edit",
  isLoggedIn,
  validateAuthor,
  catchAsync(campgrounds.renderEditForm)
);

router.put(
  "/:id",
  isLoggedIn,
  validateAuthor,
  validateCampground,
  catchAsync(campgrounds.updateCampground)
);

// Delete a campground
router.delete(
  "/:id",
  isLoggedIn,
  validateAuthor,
  catchAsync(campgrounds.deleteCampground)
);

module.exports = router;

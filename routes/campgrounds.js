const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const campgrounds = require("../controllers/campgrounds");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const {
  isLoggedIn,
  validateAuthor,
  validateCampground,
} = require("../middleware");

// Getting index of campgrounds, and creating a new one
router
  .route("/")
  .get(catchAsync(campgrounds.index))
  // .post(
  //   isLoggedIn,
  //   validateCampground,
  //   catchAsync(campgrounds.createCampground)
  // );
  .post(upload.array("image"), (req, res) => {
    console.log(req.body, req.files);
    res.send("It worked!");
  });

// Adding new campground
router.get("/new", isLoggedIn, campgrounds.renderNewForm);

// Showing campground page + update and delete
router
  .route("/:id")
  .get(catchAsync(campgrounds.showCampground))
  .put(
    isLoggedIn,
    validateAuthor,
    validateCampground,
    catchAsync(campgrounds.updateCampground)
  )
  .delete(isLoggedIn, validateAuthor, catchAsync(campgrounds.deleteCampground));

// Edit page and edit request
router.get(
  "/:id/edit",
  isLoggedIn,
  validateAuthor,
  catchAsync(campgrounds.renderEditForm)
);

module.exports = router;

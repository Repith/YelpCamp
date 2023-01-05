const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const users = require("../controllers/users");

//User registration
router
  .route("/register")
  .get(users.renderRegister)
  .post(catchAsync(users.register));

// User login and authentication
router
  .route("/login")
  .get(users.renderLogin)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
      keepSessionInfo: true,
    }),
    users.login
  );

// Logout
router.get("/logout", users.logout);

module.exports = router;

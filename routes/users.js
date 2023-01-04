const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");
const { application } = require("express");

//User registration
router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post(
  "/register",
  catchAsync(async (req, res) => {
    try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      const registerUser = await User.register(user, password);
      //Logging in after registration
      req.login(registerUser, (err) => {
        if (err) return next(err);
        req.flash("success", "Welcome to our Camp!");
        res.redirect("/campgrounds");
      });
    } catch (e) {
      req.flash("error", "Username is already taken!");
      res.redirect("register");
    }
  })
);

// User login
router.get("/login", (req, res) => {
  res.render("users/login");
});

// User authentication
router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  (req, res) => {
    req.flash("success", "Welcome back our Camp!");
    const redirectUrl = req.cookies.originalUrl || "/campgrounds";
    delete req.cookies.originalUrl;
    res.redirect(redirectUrl);
  }
);

// Logout (needs to be asynchronous since last update)
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "Goodbye!");
    res.redirect("/campgrounds");
  });
});

module.exports = router;

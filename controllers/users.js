const User = require("../models/user");

module.exports.renderRegister = (req, res) => {
  res.render("users/register");
};

module.exports.register = async (req, res) => {
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
};

module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

module.exports.login = (req, res) => {
  req.flash("success", "Welcome back our Camp!");
  // const redirectUrl = req.cookie.originalUrl || "/campgrounds";
  // res.cookie("originalUrl", "");
  const redirectUrl = req.session.returnTo || "/campgrounds";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "Goodbye!");
    res.redirect("/campgrounds");
  });
};

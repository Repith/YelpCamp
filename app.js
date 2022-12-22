const { application } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const Campground = require("./models/campground");

const app = express();
const path = require("path");

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongodb error"));
db.once("open", () => {
  console.log("Database connected");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/makecampground", async (req, res) => {
  const camp = new Campground({
    title: "Campground",
    description: "Cheap champing",
  });
  await camp.save();
  res.send(camp);
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});

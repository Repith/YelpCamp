const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

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

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      // Your user ID!
      author: "63b6ae079c4f242c21e706aa",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio, suscipit dignissimos quam quidem dolorum voluptas fugiat ut sint, magni earum maxime autem enim voluptatum deleniti. Porro delectus nostrum facere cum!",
      price: price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dl5q2i8hc/image/upload/v1673044070/YelpCamp/wy48mnjvvtw0ywaqhswp.png",
          filename: "YelpCamp/wy48mnjvvtw0ywaqhswp",
        },
        {
          url: "https://res.cloudinary.com/dl5q2i8hc/image/upload/v1673044070/YelpCamp/wy48mnjvvtw0ywaqhswp.png",
          filename: "YelpCamp/wy48mnjvvtw0ywaqhswp",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});

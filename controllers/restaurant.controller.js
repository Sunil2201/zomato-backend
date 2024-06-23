const mongoose = require("mongoose");
const fs = require("fs");
const Restaurant = require("../models/restaurant.model");

const restaurantsData = fs.readFileSync("E:/zomato-backend/data/restaurants.json", "utf8");
const restaurants = JSON.parse(restaurantsData);

const seedRestaurantsData = async () => {
  try {
    for (const restaurant of restaurants) {
      const { name, cuisine, address, city, reviews, menu, averageRating } =
        restaurant;
      const newRestaurant = new Restaurant({
        name,
        cuisine,
        address,
        city,
        reviews,
        menu,
        averageRating,
      });
      await newRestaurant.save();
      console.log(`Seeded new restaurant ${restaurant?.name}`);
    }
    console.log("Completed database seeding");
  } catch (error) {
    console.error("Error in seeding restaurants data", error);
  } finally {
    mongoose.disconnect();
  }
};

module.exports = { seedRestaurantsData };

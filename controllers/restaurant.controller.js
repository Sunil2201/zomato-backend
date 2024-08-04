const mongoose = require("mongoose");
const fs = require("fs");
const Restaurant = require("../models/restaurant.model");

const restaurantsData = fs.readFileSync(
  "E:/zomato-backend/data/restaurants.json",
  "utf8"
);
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

const createRestaurant = async (restaurant) => {
  try {
    const newRestaurant = new Restaurant(restaurant);
    const savedRestaurant = await newRestaurant.save();
    return savedRestaurant;
  } catch (error) {
    throw error;
  }
};

const readRestaurant = async (restaurantName) => {
  try {
    const restaurant = await Restaurant.findOne({ name: restaurantName });
    if (restaurant) {
      return restaurant;
    } else {
      console.log("Restaurant not found for the given name!");
    }
  } catch (error) {
    throw error;
  }
};

const readAllRestaurants = async () => {
  try {
    const restaurants = await Restaurant.find({});
    return restaurants;
  } catch (error) {
    throw error;
  }
};

const readResturantsByCuisine = async (cuisineName) => {
  try {
    const restaurantsByGivenCuisineName = await Restaurant.find({
      cuisine: cuisineName,
    });
    return restaurantsByGivenCuisineName;
  } catch (error) {
    throw error;
  }
};

const updateRestaurant = async (restaurantId, dataToUpdate) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      dataToUpdate,
      { new: true }
    );
    if (updatedRestaurant) {
      return updatedRestaurant;
    } else {
      console.log("Could not find restaurant with the given id!");
    }
  } catch (error) {
    throw error;
  }
};

const deleteRestaurant = async (restaurantId) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndUpdate(restaurantId);
    if (deletedRestaurant) {
      return deletedRestaurant;
    } else {
      console.log("Could not find restaurant with the given id!");
    }
  } catch (error) {
    throw error;
  }
};

const searchRestaurantsByLocation = async (restaurantLocation) => {
  try {
    const restaurantsForGivenLocation = await Restaurant.find({
      city: restaurantLocation,
    });
    return restaurantsForGivenLocation;
  } catch (error) {
    throw error;
  }
};

const filterRestaurantsByRating = async (rating) => {
  try {
    const restaurantsFilteredByRating = await Restaurant.find({
      averageRating: { $gte: rating },
    });
    return restaurantsFilteredByRating;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  seedRestaurantsData,
  createRestaurant,
  readRestaurant,
  readAllRestaurants,
  readResturantsByCuisine,
  updateRestaurant,
  deleteRestaurant,
  searchRestaurantsByLocation,
  filterRestaurantsByRating
};

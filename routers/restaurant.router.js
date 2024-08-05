const express = require("express");
const restaurantRouter = express.Router();
const {
  createRestaurant,
  readRestaurant,
  readAllRestaurants,
  deleteRestaurant,
} = require("../controllers/restaurant.controller");

restaurantRouter.post("/", async (req, res) => {
  try {
    const requiredFields = ["name", "cuisine", "address", "city", "menu"];
    const missingFields = requiredFields.filter(
      (field) => !requiredFields.includes(field)
    );

    if (missingFields.length) {
      res.status(400).json({
        error: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const restaurantToAdd = req?.body;
    const addedRestaurant = await createRestaurant(restaurantToAdd);
    res.json(addedRestaurant);
  } catch (error) {
    res.status(500).json({ message: "Failed to add a new restaurant!" });
  }
});

restaurantRouter.get("/:name", async (req, res) => {
  const restaurantName = req.params?.name;
  try {
    const restaurantByGivenName = await readRestaurant(restaurantName);
    if (restaurantByGivenName) {
      res.json(restaurantByGivenName);
    } else {
      res
        .status(404)
        .json({ error: `No restaurant found with the name ${restaurantName}` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get the restaurant by given name!" });
  }
});

restaurantRouter.get("/", async (req, res) => {
  try {
    const restaurants = await readAllRestaurants();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Failed to read all restaurants!" });
  }
});

restaurantRouter.get("/cuisine/:cuisineType", async (req, res) => {
  try {
    const cuisineType = req.params?.cuisineType;
    const restaurants = await readResturantsByCuisine(cuisineType);
    if (restaurants) {
      res.json(restaurants);
    } else {
      res
        .status(404)
        .json({ error: `No restaurant found with the cuisine ${cuisineType}` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to read restaurants with the given cuisine" });
  }
});

restaurantRouter.post("/:restaurantId", async (req, res) => {
  try {
    const restaurantToUpdate = req?.body;
    const restaurantId = req?.params?.restaurantId;
    const updatedRestaurant = await updateRestaurant(
      restaurantId,
      restaurantToUpdate
    );
    if (updatedRestaurant) {
      res.json(updatedRestaurant);
    } else {
      res.status(404).json({
        error: `No restaurant found with the given ID ${restaurantId}`,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update restaurant!" });
  }
});

restaurantRouter.delete("/:restaurantId", async (req, res) => {
  try {
    const restaurantId = req?.params?.restaurantId;
    const deletedRestaurant = await deleteRestaurant(restaurantId);
    if (deletedRestaurant) {
      res.status(200).json({
        message: "Restaurant deleted successfully!",
        deletedRestaurant,
      });
    } else {
      res.status(404).json({
        error: `No restaurant found with the given ID ${restaurantId}`,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete restaurant!" });
  }
});

restaurantRouter.get("/search", async (req, res) => {
  try {
    const location = req.query?.location;
    const restaurants = await searchRestaurantsByLocation(location);
    if (restaurants) {
      res.json(restaurants);
    } else {
      res
        .status(404)
        .json({ error: `No restaurant found at the given ${location}` });
    }
  } catch (error) {
    res.status(500).json({
      message: `Failed to get restaurants at the given location ${location}!`,
    });
  }
});

restaurantRouter.get("/rating/:minRating", async (req, res) => {
  try {
    const minRating = req.params?.minRating;
    const restaurants = await filterRestaurantsByRating(minRating);
    if (restaurants) {
      res.json(restaurants);
    } else {
      res.status(404).json({
        error: `No restaurants found with rating greater than ${minRating}`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Failed to get restaurants with rating greater than ${minRating}`,
    });
  }
});

module.exports = restaurantRouter;

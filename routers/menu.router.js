const express = require("express");
const menuRouter = express.Router();
const {
  addDishToMenu,
  removeDishFromMenu,
} = require("../controllers/menu.controller");

menuRouter.post("/:restaurantId", async (req, res) => {
  try {
    const restaurantId = req.params?.restaurantId;
    const dishToAdd = req.body;
    const addedDish = await addDishToMenu(restaurantId, dishToAdd);
    if (addedDish) {
      res.json(addedDish);
    } else {
      res
        .status(404)
        .json({ message: `No restaurant found with ID '${restaurantId}'` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add a dish to the restaurant menu" });
  }
});

menuRouter.delete("/:restaurantId/:dishName", async (req, res) => {
  try {
    const restaurantId = req.params?.restaurantId;
    const dishName = req.params?.dishName;
    const updatedRestaurant = await removeDishFromMenu(restaurantId, dishName);
    if (dishToDelete) {
      res.json(updatedRestaurant);
    } else {
      res.status(404).json({
        message: `No restaurant found with ID '${restaurantId}' or dish '${dishName}' not found in the menu.`,
      });
    }
  } catch (error) {
    res.status(500).json("Could not remove a dish from restaurant menu");
  }
});

module.exports = menuRouter;

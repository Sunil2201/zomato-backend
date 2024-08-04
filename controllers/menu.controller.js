const Restaurant = require("../models/restaurant.model");

const addDishToMenu = async (restaurantId, dish) => {
  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (restaurant) {
      restaurant.menu.push(dish);
      const updatedRestaurant = await restaurant.save();
      return updatedRestaurant;
    } else {
      console.log("Restaurant not found!");
    }
  } catch (error) {
    throw error;
  }
};

const removeDishFromMenu = async (restaurantId, nameOfDish) => {
  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (restaurant) {
      const updatedMenuInRestaurant = {
        ...restaurant,
        menu: restaurant.menu.filter(
          (menuItem) => menuItem?.name !== nameOfDish
        ),
      };
      const updatedRestaurant = await Restaurant.findByIdAndUpdate(
        restaurantId,
        updatedMenuInRestaurant
      );
      return updatedRestaurant;
    } else {
      console.log("Restaurant not found!");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { addDishToMenu, removeDishFromMenu };

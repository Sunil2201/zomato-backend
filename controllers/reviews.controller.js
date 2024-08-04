const Restaurant = require("../models/restaurant.model");

const addRestaurantReviewAndRating = async (
  restaurantId,
  userId,
  reviewText,
  userRating
) => {
  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (restaurant) {
      const review = {
        user: userId,
        text: reviewText,
        rating: userRating,
      };

      const updatedAverageRating = getUpdatedAverageRating(
        userRating,
        restaurant
      );

      restaurant.averageRating = updatedAverageRating;
      restaurant.reviews.push(review);
      await restaurant.save();

      const restaurantPopulatedWithUserReviews = await Restaurant.findById(
        restaurantId
      ).populate({
        path: "user",
        select: "username profilePictureUrl",
      });

      return restaurantPopulatedWithUserReviews;
    } else {
      console.log("Restaurant not found for the given id!");
    }
  } catch (error) {
    throw error;
  }
};

const getUpdatedAverageRating = (userRating, restaurant) => {
  const totalReviewers = restaurant?.reviews.length;
  const currentAverageRating = restaurant?.averageRating;
  const newAverageRating =
    (currentAverageRating * (totalReviewers - 1) + userRating) / totalReviewers;

  return newAverageRating;
};

const getUserReviewsForRestaurant = async (restaurantId) => {
  try {
    const restaurant = await Restaurant.findById(restaurantId).populate({
      path: "user",
      select: "username profilePictureUrl",
    });
    if (restaurant) {
      const userReviews = restaurant.reviews.map((review) => ({
        reviewText: review?.text,
        user: review?.user,
        rating: review?.rating,
      }));

      return userReviews;
    } else {
      console.log("Restaurant not found for the given id!");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { addRestaurantReviewAndRating, getUserReviewsForRestaurant };

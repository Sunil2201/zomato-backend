const express = require("express");
const reviewsRouter = express.Router();
const {
  addRestaurantReviewAndRating,
} = require("../controllers/reviews.controller");

reviewsRouter.post("/:restaurantId", async (req, res) => {
  try {
    const restaurantId = req.params?.restaurantId;
    const { userId, rating, reviewText } = req?.body;
    const updatedRestaurant = await addRestaurantReviewAndRating(
      restaurantId,
      userId,
      rating,
      reviewText
    );
    if (updatedRestaurant) {
      res.json(updatedRestaurant);
    } else {
      res
        .status(404)
        .json({ message: `No restaurant found with ID '${restaurantId}'` });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to add a review and rating." });
  }
});

reviewsRouter.get("/:restaurantId", async (req, res) => {
  try {
    const restaurantId = req.params?.restaurantId;
    const restaurantReviews = await getUserReviewsForRestaurant(restaurantId);
    if (restaurantReviews) {
      res.json(restaurantReviews);
    } else {
      res.status(404).json({
        message: `No restaurant found with ID '${restaurantId}' or no user reviews available.`,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch user reviews for the restaurant." });
  }
});

module.exports = reviewsRouter;

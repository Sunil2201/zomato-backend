const mongoose = require("mongoose");
const fs = require("fs");
const User = require("../models/user.model");

const usersData = fs.readFileSync("E:/zomato-backend/data/users.json", "utf8");
const users = JSON.parse(usersData);

const seedUsersData = async () => {
  try {
    for (const user of users) {
      const { email, password, username, fullName, profilePictureUrl } =
        user;
      const newRestaurant = new User({
        email,
        password,
        username,
        fullName,
        profilePictureUrl,
      });
      await newRestaurant.save();
      console.log(`Seeded new user ${user?.name}`);
    }
    console.log("Completed database seeding");
  } catch (error) {
    console.error("Error in seeding restaurants data", error);
  } finally {
    mongoose.disconnect();
  }
};

module.exports = { seedUsersData };

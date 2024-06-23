const express = require("express");
const { dbConnection } = require("./db/db_connection");
const { seedRestaurantsData } = require("./controllers/restaurant.controller");
const { seedUsersData } = require("./controllers/user.controller");

const app = express();

dbConnection();
// seedRestaurantsData();
// seedUsersData();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

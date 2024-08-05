const express = require("express");
const cors = require("cors");
const app = express();

const { dbConnection } = require("./db/db_connection");
const restaurantRouter = require("./routers/restaurant.router");
const menuRouter = require("./routers/menu.router");
const reviewsRouter = require("./routers/reviews.router");

dbConnection();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello Express!");
});

app.use("/restaurants", restaurantRouter);
app.use("/menu", menuRouter);
app.use("/reviews", reviewsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require("express");
const { dbConnection } = require("./db/db_connection");

const app = express();

dbConnection();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require("express");
const cors = require("cors");
const conn = require("./config/dbconnection");

require("dotnet").config();

const app = express();

conn();

app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
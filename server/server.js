import express from "express";
import cors from "cors";
import { conn } from "./config/dbconnection.js";
import { router } from "./routes/routes.js";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

conn();

app.use(cors());
app.use(express.json());

app.use("/", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

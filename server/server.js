import express from "express";
import cors from "cors";
import { conn } from "./config/dbconnection.js";
import { router } from "./routes/routes.js";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

conn().then(() => {
  console.log("Connected to MongoDB");

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    }),
  );

  app.use("/", router);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

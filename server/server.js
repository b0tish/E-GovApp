import express from "express";
import cors from "cors";
import { conn } from "./config/dbconnection.js";
import { router } from "./routes/routes.js";
import * as dotenv from "dotenv";
import sessionController from "./controllers/sessionController.js";

dotenv.config();

const app = express();

conn().then(() => {
  console.log("Connected to MongoDB");

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    }),
  );
});

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   }),
// );
// d
app.use(express.json());

app.use(sessionController);

app.use("/", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import session from "express-session";
console.log("MONGO_URI from sessionController:", process.env.MONGO_URI);
const sessionController = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600000,
    sameSite: "strict",
  },

  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    // mongooseConnection: mongoose.connection,
    collectionName: "sessions",
  }),
});

export default sessionController;

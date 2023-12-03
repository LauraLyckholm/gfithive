// ------------ IMPORTS ------------ //
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { giftRouter } from "./routes/giftRoutes";
import { userRouter } from "./routes/userRoutes";
import dotenv from "dotenv";
dotenv.config();

// ------------ VARIABLES ------------ //
// Defines the port the app will run on
const port = process.env.PORT || 8080;
const app = express();

// ------------ MIDDLEWARE ------------ //
// Uses the imported routes in the app
// Middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
app.use("/", giftRouter);
app.use("/", userRouter);

// Middleware to handle error if service is down
app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next();
  } else {
    res.status("503").json({ error: "Service unavailable" })
  }
})

// ------------ DATABASE CONNECTION ------------ //
// Connection to the database through Mongoose
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/gifthive";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

// ------------ APP ROUTES ------------ //
// app.get("/home", (req, res) => {
//   res.send("Welcome to Gifthive! Let's get started!");
// });

// app.get("/hive", (req, res) => {
//   res.send("Welcome to your hive!");
// });

// ------------ SERVER START ------------ //
// Starts the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

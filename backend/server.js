// ------------ IMPORTS ------------ //
// import express from "express";
// import cors from "cors";
import listEndpoints from "express-list-endpoints";
import dotenv from "dotenv";
dotenv.config();
import { connectToMongoDB } from "./config/db";
import { serviceDown } from "./middleware/serviceDown";
import { giftRouter } from "./routes/giftRoutes";
import { userRouter } from "./routes/userRoutes";

// ------------ VARIABLES ------------ //
// Defines the port the app will run on
const port = process.env.PORT;

const cors = require("cors");
const express = require("express");
const app = express();

// const corsOptions = {
//   origin: "https://gifthive.netlify.app",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
// };


// ------------ MIDDLEWARE ------------ //
// Uses the imported routes in the app
// Middlewares to enable cors and json body parsing
// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
app.use(serviceDown); // Middleware to check if the database is running

// ------------ APP ROUTES ------------ //
// Displays endpoints
app.get("/", (req, res) => {
  try {
    const endpoints = listEndpoints(app);
    res.json({
      message: "Welcome to the Gifthive API",
      endpoints
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
})

app.use("/user-routes", userRouter);
app.use("/gift-routes", giftRouter);

// ------------ DATABASE CONNECTION ------------ //
// Connection to the database through Mongoose
connectToMongoDB();

// ------------ SERVER START ------------ //
// Starts the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

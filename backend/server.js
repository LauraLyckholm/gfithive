// ------------ IMPORTS ------------ //
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { connectToMongoDB } from "./config/db";
import { serviceDown } from "./middleware/serviceDown";
import { giftRouter } from "./routes/giftRoutes";
import { userRouter } from "./routes/userRoutes";

// ------------ VARIABLES ------------ //
// Defines the port the app will run on
const port = process.env.PORT;
const app = express();

// ------------ MIDDLEWARE ------------ //
// Uses the imported routes in the app
// Middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
app.use(serviceDown); // Middleware to check if the database is running

// ------------ APP ROUTES ------------ //
app.use("/", giftRouter);
app.use("/user-routes", userRouter);

// ------------ DATABASE CONNECTION ------------ //
// Connection to the database through Mongoose
connectToMongoDB();

// ------------ SERVER START ------------ //
// Starts the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

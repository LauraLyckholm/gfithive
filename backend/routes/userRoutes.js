// ------------ IMPORTS ------------ //
import express from "express";
import asyncHandler from "express-async-handler";
import { authenticateUser } from "../middleware/authenticateUser";
import {
    registerUserController,
    loginUserController,
    getDashboardController,
    getUsersController
} from "../controllers/userControllers";
import listEndpoints from "express-list-endpoints";

// ------------ ROUTES ------------ //
// Creates a new router and makes it available for import in other files
export const userRouter = express();

// Displays endpoints
userRouter.get("/", asyncHandler(async (req, res) => {
    try {
        const endpoints = listEndpoints(userRouter);
        res.json(endpoints);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
}));

userRouter.post("/register", registerUserController);
userRouter.post("/login", loginUserController);
userRouter.get("/dashboard", authenticateUser, getDashboardController); // The authenticateUser middleware is used to check if the user is logged in
userRouter.get("/users", getUsersController);
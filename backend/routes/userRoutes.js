// ------------ IMPORTS ------------ //
import express from "express";
import asyncHandler from "express-async-handler";
import { authenticateUser } from "../middleware/authenticateUser";
import {
    // getUsersController,
    registerUserController,
    loginUserController,
    getDashboardController,
    updateUserController,
    deleteUserController,
    getUsersSharedHivesController
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

// userRouter.get("/users", getUsersController);
userRouter.get("/dashboard", authenticateUser, getDashboardController);
userRouter.get("/users/shared-hives/:id", authenticateUser, getUsersSharedHivesController);
userRouter.post("/register", registerUserController);
userRouter.post("/login", loginUserController);
userRouter.put("/users/:id", authenticateUser, updateUserController);
userRouter.delete("/users/:id", authenticateUser, deleteUserController);


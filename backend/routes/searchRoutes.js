// ------------ IMPORTS ------------ //
import express from "express";
import asyncHandler from "express-async-handler";
import { authenticateUser } from "../middleware/authenticateUser";
import {
    searchControllers
} from "../controllers/searchControllers";
import listEndpoints from "express-list-endpoints";

// ------------ ROUTES ------------ //
// Creates a new router and makes it available for import in other files
export const searchRouter = express();

// Displays endpoints
searchRouter.get("/", asyncHandler(async (req, res) => {
    try {
        const endpoints = listEndpoints(userRouter);
        res.json(endpoints);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
}));

searchRouter.get("/search", authenticateUser, searchControllers);
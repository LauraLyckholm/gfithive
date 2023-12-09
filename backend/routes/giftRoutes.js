// ------------ IMPORTS ------------ //
import express from "express";
import asyncHandler from "express-async-handler";
import {
    getGiftsController,
    getHivesController,
    createGiftItemController,
    createHiveController
} from "../controllers/giftControllers";
const listEndpoints = require("express-list-endpoints");

// ------------ ROUTES ------------ //
// Creates a new router and makes it available for import in other files
export const giftRouter = express();

// Displays endpoints
giftRouter.get("/", asyncHandler(async (req, res) => {
    try {
        const endpoints = listEndpoints(giftRouter);
        res.json(endpoints);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
}));

// ------------ ROUTES ------------ //
giftRouter.get("/gifts", getGiftsController);
giftRouter.get("/hives", getHivesController);
giftRouter.post("/gifts", createGiftItemController);
giftRouter.post("/hives", createHiveController);
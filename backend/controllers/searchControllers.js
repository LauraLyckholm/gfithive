// ------------ IMPORTS ------------ //
import { Gift } from "../models/Gift";
import { Hive } from "../models/Hive";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

// ------------ CONTROLLERS ------------ //
// Function to search for gifts and hives
export const searchControllers = asyncHandler(async (req, res) => {
    const { searchTerm } = req.query;
    const userId = req.user._id; // Assuming req.user is populated with the logged-in user's data

    // Search for hives by name that belong to the logged-in user
    const hives = await Hive.find({
        userId: userId,
        name: { $regex: searchTerm, $options: "i" }
    });

    // Search for gifts by name that belong to the logged-in user
    const gifts = await Gift.find({
        userId: userId,
        gift: { $regex: searchTerm, $options: "i" }
    });

    // If no results are found, return a 404 error
    if (hives.length === 0 && gifts.length === 0) {
        res.status(404).json({ error: "No results found" });
        return;
    }

    // Return the search results
    res.json({ hives, gifts });
});
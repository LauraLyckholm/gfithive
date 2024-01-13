// ------------ IMPORTS ------------ //
import { Gift } from "../models/Gift";
import { Hive } from "../models/Hive";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

// ------------ CONTROLLERS ------------ //
// Function to search for gifts and hives
export const searchControllers = asyncHandler(async (req, res) => {
    const { searchTerm } = req.query;

    // Creates a new array to store the search results
    let hives = [];
    // Creates a variable to store the search results for a single hive
    let hiveById = null;

    // Checks if the search term is a valid MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(searchTerm)) {
        hiveById = await Hive.findById(searchTerm);
    }

    // If the search term is not a valid MongoDB ObjectId, or if the search term is a valid MongoDB ObjectId but no hive is found, search for hives by name
    if (!hiveById) {
        hives = await Hive.find({ name: { $regex: searchTerm, $options: "i" } });
    }

    // Search for gifts by name
    const gifts = await Gift.find({ gift: { $regex: searchTerm, $options: "i" } });

    // If no results are found, return a 404 error
    if ((hives.length === 0 && !hiveById) && gifts.length === 0) {
        res.status(404).json({ error: "No results found" });
        throw new Error("No results found");
    }

    // Return the search results
    res.json({ hives, hiveById, gifts });
});
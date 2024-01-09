import { Gift } from "../models/Gift";
import { Hive } from "../models/Hive";
import asyncHandler from "express-async-handler";

// Function to search for gifts and hives
export const searchControllers = asyncHandler(async (req, res) => {
    const { searchTerm } = req.query;

    const hives = await Hive.find({ name: { $regex: searchTerm, $options: "i" } });
    const gifts = await Gift.find({ gift: { $regex: searchTerm, $options: "i" } });

    if (hives.length === 0 && gifts.length === 0) {
        res.status(404).json({ error: "No results found" });
        throw new Error("No results found");
    }

    res.json({ hives, gifts });
});
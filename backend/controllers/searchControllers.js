import { Gift } from "../models/Gift";
// import { User } from "../models/User";
import { Hive } from "../models/Hive";
import asyncHandler from "express-async-handler";

export const searchControllers = asyncHandler(async (req, res) => {
    const { searchTerm } = req.query;

    const hives = await Hive.find({ name: { $regex: searchTerm, $options: "i" } });
    const gifts = await Gift.find({ gift: { $regex: searchTerm, $options: "i" } });
    const tags = await Gift.find({ tags: { $regex: searchTerm, $options: "i" } });

    res.json({ hives, gifts, tags });
});
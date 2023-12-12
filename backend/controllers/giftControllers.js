import { Gift } from "../models/Gift";
import { User } from "../models/User";
import { Hive } from "../models/Hive";
import asyncHandler from "express-async-handler";

export const getGiftsController = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    // Find all gifts and sort them by date created in descending order
    const gifts = await Gift.find({ userId }).sort({ createdAt: "desc" }).exec();
    res.json(gifts);
});

export const getHivesController = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    // Find all hives and populate their associated gifts in ascending order
    const hives = await Hive.find({ userId }).sort({ name: "asc" }).populate("gifts").exec();
    res.json(hives);
});

export const createGiftItemController = asyncHandler(async (req, res) => {
    // Retrieves the information sent by the client
    const { gift, tags, bought, hiveId } = req.body;
    const userId = req.user._id;
    // Checks if there is a hiveId in the request body, if there isn't, an error message is sent to the client
    if (!hiveId) {
        return res.status(400).json({ error: "hiveId is required." });
    }

    try {
        // Find the hive associated with the provided hiveId and userId
        const hiveExists = await Hive.findOne({ _id: hiveId, userId });

        // If the hive doesn't exist or doesn't belong to the user, send an error message
        if (!hiveExists) {
            return res.status(404).json({ error: "Hive not found or unauthorized." });
        }

        // Create a new gift item associated with the given hiveId
        const giftItem = await new Gift({ gift, tags, bought, hiveId }).save();

        // Update the corresponding hive's gifts array with the newly created gift's ID
        hiveExists.gifts.push(giftItem._id);
        await hiveExists.save();

        // Find the user and update their gifts array with the new gift's ID
        await User.findOneAndUpdate(
            { _id: userId },
            { $push: { gifts: giftItem._id } },
            { new: true }
        );

        res.json(giftItem);
    } catch (error) {
        console.error("Error creating gift item:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export const createHiveController = asyncHandler(async (req, res) => {
    const { name, gifts } = req.body;
    const userId = req.user._id;

    try {
        // Check if a hive with the provided name already exists for the user
        const hiveNameExistsForUser = await Hive.findOne({ name, userId });

        if (hiveNameExistsForUser) {
            return res.status(400).json({ error: "Hive with this name already exists." });
        } else {
            // If the hive name is not found for the user, create a new hive associated with the user
            const newHive = await new Hive({ name, gifts, userId }).save();

            // Update the corresponding user's list of hives
            const user = await User.findById(userId);
            user.hives.push(newHive._id);
            await user.save();

            res.json(newHive);
        }
    } catch (error) {
        console.error("Error creating hive:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
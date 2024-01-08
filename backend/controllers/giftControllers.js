import { Gift } from "../models/Gift";
import { User } from "../models/User";
import { Hive } from "../models/Hive";
import asyncHandler from "express-async-handler";

export const getGiftsController = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    // Find all gifts and sort them by date created in descending order
    // const gifts = await Gift.find({ userId }).sort({ createdAt: "desc" }).exec();
    const gifts = await Gift.find({ userId }).exec();
    res.json(gifts);
});

export const getHiveGiftsController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    // Find all gifts associated with the provided hiveId and sort them by date created in descending order
    const gifts = await Hive.findOne({ _id: id, userId }).populate("gifts").exec();
    res.json(gifts.gifts);
});

export const getHivesController = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    // Find all hives and populate their associated gifts in ascending order
    // const hives = await Hive.find({ userId }).sort({ createdAt: "desc" }).populate("gifts").exec();
    const hives = await Hive.find({ userId }).populate("gifts").exec();
    res.json(hives);
});

export const getIndividualHiveController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    // Find the hive associated with the provided id and populate its associated gifts
    const hive = await Hive.findOne({ _id: id, userId }).populate("gifts").exec();
    res.json(hive);
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

export const updateGiftItemController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { gift, tags, bought } = req.body;

    try {
        // Find the gift associated with the provided id and update the gift's information
        const giftItem = await Gift.findByIdAndUpdate({ _id: id }, { gift, tags, bought }, { new: true });
        console.log(giftItem);

        if (!giftItem) {
            return res.status(404).json({ error: "Gift not found or unauthorized." });
        }

        res.json(giftItem);
    } catch (error) {
        console.error("Error updating gift item:", error);
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

            // Send the created hive's data in the response
            res.json(newHive);
        }
    } catch (error) {
        console.error("Error creating hive:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export const updateHiveName = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.user._id;

    try {
        // Find the hive associated with the provided id and userId
        const hive = await Hive.findByIdAndUpdate({ _id: id, userId }, { name }, { new: true });

        if (!hive) {
            return res.status(404).json({ error: "Hive not found or unauthorized." });
        }

        res.json(hive);
    } catch (error) {
        console.error("Error updating hive name:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export const deleteGiftController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    try {
        // Find the hive associated with the provided id and userId
        const deletedGift = await Gift.findByIdAndDelete(id);

        if (!deletedGift) {
            return res.status(404).json({ error: "Gift not found or unauthorized." });
        }

        // Update the user's list of gifts in the hive by removing the deleted gifts's ID

        // PERHAPS REMOVE ONE OF THESE (HIVE)
        // await Hive.findByIdAndUpdate(userId,
        //     {
        //         $pull: { hives: deletedGift._id }
        //     });

        await User.findByIdAndUpdate(userId,
            { $pull: { gifts: deletedGift._id } },
            { new: true } // Return the updated document
        );

        res.json({
            message: "Gift deleted successfully",
            deletedGift: deletedGift
        });

    } catch (error) {
        console.error("Error deleting gift:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export const deleteHiveController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id; // Get the user's ID

    try {
        // Find the hive associated with the provided id and userId
        // const deletedHive = await Hive.findByIdAndDelete(id);
        const hive = await Hive.findById(id);

        if (!hive || hive.userId.toString() !== userId.toString()) {
            return res.status(404).json({ error: "Hive not found or unauthorized." });
        }

        // Delete gifts associated with the hive
        await Gift.deleteMany({ hiveId: hive._id });

        // Delete the hive
        await Hive.findByIdAndDelete(id);

        // Send a response indicating successful deletion
        res.json({
            message: "Hive deleted successfully",
            deletedHive: hive,
        });
    } catch (error) {
        console.error("Error deleting hive:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



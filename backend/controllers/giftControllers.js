import { Gift } from "../models/Gift";
import { User } from "../models/User";
import { Hive } from "../models/Hive";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

export const getHivesController = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    // Find all hives and populate their associated gifts in ascending order
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
    const { gift, tags, bought, hiveId, dueDate } = req.body;
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

        // Checks that the dueDate is in the future
        if (dueDate && new Date(dueDate) < new Date()) {
            return res.status(400).json({ error: "Due date must be in the future." });
        }

        // Create a new gift item associated with the given hiveId
        const giftItem = await new Gift({ gift, tags, bought, hiveId, dueDate }).save();

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

export const createNewController = asyncHandler(async (req, res) => {
    const { gift, tags, bought, name, dueDate } = req.body;
    const userId = req.user._id;

    try {
        // Check if a hive with the provided name already exists for the user
        const hiveNameExistsForUser = await Hive.findOne({ name, userId });

        let newHive;

        if (hiveNameExistsForUser) {
            // If hive with the name already exists, use the existing hive
            newHive = hiveNameExistsForUser;
        } else {
            // If the hive name is not found for the user, create a new hive
            newHive = await new Hive({ name, userId }).save();

            // Update the corresponding user's list of hives
            await User.findByIdAndUpdate(userId, { $push: { hives: newHive._id } });
        }

        // If gift details are provided, create a new gift
        if (gift) {
            // Checks that the dueDate is in the future
            if (dueDate && new Date(dueDate) < new Date()) {
                return res.status(400).json({ error: "Due date must be in the future." });
            }

            // Creates a new gift item associated with the new hive
            const giftItem = await new Gift({ gift, tags, bought, dueDate, hiveId: newHive._id }).save();

            // Updates the corresponding hive's gifts array with the newly created gift's ID
            newHive.gifts.push(giftItem._id);
            await newHive.save();

            // Updates the user's gifts array with the new gift's ID
            await User.findByIdAndUpdate(userId, { $push: { gifts: giftItem._id } });

            res.json({ hive: newHive, gift: giftItem });
        } else {
            // If no gift details provided, only return the hive
            res.json(newHive);
        }
    } catch (error) {
        console.error("Error creating hive:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export const updateGiftItemController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { gift, tags, bought, dueDate } = req.body;

    try {
        // Checks that the dueDate is in the future
        if (dueDate && new Date(dueDate) < new Date()) {
            return res.status(400).json({ error: "Due date must be in the future." });
        }

        // Find the gift associated with the provided id and update the gift's information
        const giftItem = await Gift.findByIdAndUpdate({ _id: id }, { gift, tags, bought, dueDate }, { new: true });

        if (!giftItem) {
            return res.status(404).json({ error: "Gift not found or unauthorized." });
        }

        res.json(giftItem);
    } catch (error) {
        console.error("Error updating gift item:", error);
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
        const hive = await Hive.findById(id);

        if (!hive || hive.userId.toString() !== userId.toString()) {
            return res.status(404).json({ error: "Hive not found or unauthorized." });
        }

        // Delete gifts associated with the hive
        await Gift.deleteMany({ hiveId: hive._id });

        // Remove the hive reference from the user's account
        await User.findByIdAndUpdate(userId, {
            $pull: { hives: hive._id }
        });

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

export const shareHiveController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { shareToEmail } = req.body;
    const userId = req.user._id; // The user sharing the hive

    try {
        // Find the hive associated with the provided id and userId
        const hive = await Hive.findById(id);

        if (!hive || hive.userId.toString() !== userId.toString()) {
            return res.status(404).json({ error: "Hive not found or unauthorized." });
        }

        // Find recipient user based on email
        const recipient = await User.findOne({ email: shareToEmail });
        if (!recipient) {
            return res.status(404).json({ error: "Recipient not found." });
        }

        // Check if the hive is already shared with the recipient
        if (hive.sharedWith.includes(recipient._id)) {
            return res.status(400).json({ error: "Hive already shared with this user." });
        };

        // Update the hive's sharedWith field
        hive.sharedWith.push(recipient._id);
        await hive.save();

        // Optionally update recipient's sharedHives field
        recipient.sharedHives.push(hive._id);
        await recipient.save();

        res.json({
            message: "Hive shared successfully",
            recipientId: recipient._id,
            email: shareToEmail,
            sharedHive: hive,
        });
    } catch (error) {
        console.error("Error sharing hive:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export const getHivesSharedToTheUserController = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    try {
        const hives = await Hive.find({
            sharedWith: new mongoose.Types.ObjectId(userId)
        }).populate("gifts").exec();
        res.json(hives);
    } catch (error) {
        console.error("Error getting shared hives:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



// ------------ IMPORTS ------------ //
const express = require("express");
const router = express.Router();
const { GiftModel } = require("../models/Gift");
const { HiveModel } = require("../models/Hive");
const listEndpoints = require("express-list-endpoints");
import asyncHandler from "express-async-handler";

// ------------ ERROR HANDLING ENDPOINT ROUTE ------------ //
router.get("/", asyncHandler(async (req, res) => {
    try {
        const endpoints = listEndpoints(router);
        res.json(endpoints);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
}));

// ------------ ROUTES ------------ //

// This endpoint returns a maximum of 20 thoughts, sorted by `createdAt` to show the most recent thoughts first
router.get("/gifts", asyncHandler(async (req, res) => {
    const gifts = await GiftModel.find().sort({ createdAt: "desc" }).exec();
    res.json(gifts);
}));

router.post("/gifts", asyncHandler(async (req, res) => {
    // Retrieves the information sent by the client
    const { gift, tags, bought, hiveId } = req.body;

    // Checks if there is a hiveId in the request body, if there isn't, an error message is sent to the client
    if (!hiveId) {
        return res.status(400).json({ error: "hiveId is required." });
    }

    // Checks if the hiveId exists in the database before creating the gift item
    const hiveExists = await HiveModel.findById(hiveId);
    // If the hive doesn't exist, an error message is sent to the client
    if (!hiveExists) {
        return res.status(404).json({ error: "Hive not found." });
    }

    const giftItem = await new GiftModel({ gift, tags, bought, hiveId }).save();

    // Update the corresponding hive's gifts array with the newly created gift's ID
    hiveExists.gifts.push(giftItem._id);
    await hiveExists.save();

    res.json(giftItem);
}));

router.get("/hives", asyncHandler(async (req, res) => {
    // Find all hives and populate their associated gifts
    const hives = await HiveModel.find().sort({ name: "asc" }).populate("gifts").exec();

    res.json(hives);
}));


router.post("/hives", asyncHandler(async (req, res) => {
    const { name, gifts } = req.body;

    // Check if a hive with the provided name already exists in the database
    const hiveExists = await HiveModel.findOne({ name });

    if (hiveExists) {
        return res.status(400).json({ error: "Hive with this name already exists." });
    } else {
        // If the hive name is not found, create a new hive
        const newHive = await new HiveModel({ name, gifts }).save();
        res.json(newHive);
    }
}));

// Exports the router
module.exports = router;
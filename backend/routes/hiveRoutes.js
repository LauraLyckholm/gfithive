// ------------ IMPORTS ------------ //
const express = require("express");
const router = express.Router();
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

router.get("/hives", asyncHandler(async (req, res) => {
    const hives = await HiveModel.find().sort({ name: "asc" }).exec();
    res.json(hives);
}));

router.post("/hives", asyncHandler(async (req, res) => {
    const { name, gifts } = req.body;

    // Check if a hive with the provided name already exists in the database
    const existingHive = await HiveModel.findOne({ name });

    if (existingHive) {
        return res.status(400).json({ error: "Hive with this name already exists." });
    } else {
        // If the hive name is not found, create a new hive
        const newHive = await new HiveModel({ name, gifts }).save();
        res.json(newHive);
    }
}));

// Exports the router
module.exports = router;
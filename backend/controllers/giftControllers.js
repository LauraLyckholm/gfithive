import { Gift } from "../models/Gift";
import { Hive } from "../models/Hive";
import asyncHandler from "express-async-handler";

export const getGiftsController = asyncHandler(async (req, res) => {
    const gifts = await Gift.find().sort({ createdAt: "desc" }).exec();
    res.json(gifts);
});

export const getHivesController = asyncHandler(async (req, res) => {
    // Find all hives and populate their associated gifts
    const hives = await Hive.find().sort({ name: "asc" }).populate("gifts").exec();

    res.json(hives);
});

export const createGiftItemController = asyncHandler(async (req, res) => {
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

    const giftItem = await new Gift({ gift, tags, bought, hiveId }).save();

    // Update the corresponding hive's gifts array with the newly created gift's ID
    hiveExists.gifts.push(giftItem._id);
    await hiveExists.save();

    res.json(giftItem);
});

export const createHiveController = asyncHandler(async (req, res) => {
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
});

// ------------ POSSIBLY NEW CODE ------------ //
    // REMEMBER const accesssToken = req.header("Authorization") 

    // await UserModel.findOne({accesstoken: accessToken}) 


    // const newHive = await new HiveModel({ name, gifts }).save();


    // DO THIS IN THE POST and in the GET

    
    // const accesssToken = req.header("Authorization") 

    // const userFromStorage = await userModel.findOne({accesstoken: accessToken})

    // await giftModel.find({user: userFromStorage._id}).sort("-createdAt")
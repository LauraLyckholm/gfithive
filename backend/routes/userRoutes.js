// ------------ IMPORTS ------------ //
const express = require("express");
const { UserModel } = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (user) => {
    // Generate an JWT token for the user, containing the user's unique id, with an expiration time of 24 hours.
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
}

// Register a user
router.post("/register", asyncHandler(async (req, res) => {
    // Get the username and password from the request body
    const { username, password } = req.body;

    // Validate that a username and password exists, if not, send an error to the client
    try {
        if (!username || !password) {
            res.status(400);
            throw new Error("Please fill in all required fields");
        }
        // Check if the user already exists in the database, by finding a user with the same username or password from the database
        const userExists = await UserModel.findOne({
            $or: [{ username }, { password }],
        })

        // If the user exists, send an error to the client, saying the user already exists
        if (userExists) {
            res.status(400);
            throw new Error(`User with the username ${userExists.username === username} already exists`);
        }

        // Hash the users password
        const salt = bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Create a new user with the username and hashed version of the users password
        const newUser = new UserModel({
            username,
            password: hashedPassword,
        });

        // Saves the user to the database
        await newUser.save();

        // Sends a response to the client, containing the user's username, id, and a JWT token.
        res.status(201).json({
            success: true,
            response: {
                username: newUser.username,
                id: newUser._id,
                accesstoken: generateToken(newUser._id), // Generates a JWT token for the user
            },
        });

    } // If an error occurs, send an errormessage to the client
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
})
);

// Login a user
router.post("/login", asyncHandler(async (req, res) => {
    // Get the username and password from the request body
    const { username, password } = req.body;

    try {
        // Finds the user in the database, by the username, saves the user in the variable user
        const user = await UserModel.findOne({ username });

        // If the user doesn't exist, send an error to the client
        if (!user) {
            res.status(401).json({ success: false, error: "User not found" });
        }

        // If the user exists, compare the password from the request body, with the password from the database, and save it into a variable
        const passwordMatch = await bcrypt.compare(password, user.password);

        // If the passwords don't match, send an error to the client
        if (!passwordMatch) {
            res.status(401).json({ success: false, error: "Incorrect password" });
        }

        // Sends a response to the client, containing the user's username, id, and a JWT token.
        res.status(200).json({
            success: true,
            response: {
                username: user.username,
                id: user._id,
                accessToken: generateToken(user._id), // Generates a JWT token for the user
            },
        });

    } // If an error occurs, send an errormessage to the client 
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}));

// Exports the router
module.exports = router;
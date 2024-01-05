// ------------ IMPORTS ------------ //
import { User } from "../models/User"
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

// ------------ CONTROLLERS ------------ //
// Register a user
export const registerUserController = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user already exists in the database, by finding a user with the same username from the database
        const userExists = await User.findOne({ username });

        // If the user exists, send an error to the client, saying the user already exists
        if (userExists) {
            return res.status(400).json({
                success: false,
                response: "User with the username " + username + " already exists"
            }) // Checks if the user already exists, if so, it will return an error
        }

        if (!username || !password) {
            res.status(400).json({
                success: false,
                response: {
                    message: "Please fill in all required fields",
                }
            });
        };

        // Encrypts the password, so that no plain text passwords are stored in the database
        const hashedPassword = bcrypt.hashSync(password, 10);

        // If all checks pass, create a new user with the username and hashed version of the users password
        const newUser = new User({
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
                accessToken: newUser.accessToken
            },
        });

    } // If an error occurs, send an errormessage to the client
    catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({
                success: false,
                response: {
                    message: "Username already exists. Please choose another username.",
                    errors: err
                }
            });
        } else {
            // Handle other errors
            return res.status(400).json({
                success: false,
                response: {
                    message: "Could not create user",
                    errors: err
                }
            });
        }
    }
});

// Creates a controller function for the route that is used to log in a user
export const loginUserController = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    try {
        // First check if there is no user with that name, then ask the user to register
        if (!user) {
            return res.status(404).json({
                success: false,
                response: "User not found, please register for an account"
            })
        }

        // Then check if the password is correct, if not, return an error
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                response: "Incorrect password"
            })
        } else {
            return res.status(201).json({
                success: true,
                response: {
                    _id: user._id,
                    username: user.username,
                    accessToken: user.accessToken,
                    hives: user.hives,
                    gifts: user.gifts
                }
            })
        }
    } catch (err) {
        { // Checks against the rules in the model, if any of them are broken, it will return an error
            res.status(400).json({
                success: false,
                response: {
                    message: "Could not log in user",
                    errors: err.errors
                }
            })
        }
    }
});

// Creates a controller function for the route that is used to get the dashboard, which is only accessible if the user is logged in. The authentication is done in the routes-file
export const getDashboardController = asyncHandler(async (req, res) => {
    const { username, hives, gifts } = req.user; // gets the username from the authenticated user
    try {
        res.json({
            message: `Welcome to your Dashboard, ${username}!`,
            hivesCount: hives.length,
            giftsCount: gifts.length,
            gifts: gifts,
            hives: hives
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            response: {
                errors: err.errors
            }
        })
    }
});

// Creates a controller function for the route that is used to get all users
export const getUsersController = asyncHandler(async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Creates a function that makes it possible to update the users information
export const updateUserController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: "User not found or unauthorized." });
        }

        // Check if a new username is provided and if it's different from the current one
        if (username && username !== user.username) {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ error: "Username already exists" });
            }
            user.username = username;
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        console.log("User before save:", user); // Debugging line
        await user.save();
        console.log("User after save:", user); // Debugging line

        res.json({
            message: "User updated successfully",
            user: {
                _id: user._id,
                username: user.username
            }
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Creates a controller function for deleting a user account
export const deleteUserController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        // Find the user associated with the provided id
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ error: "User not found or unauthorized." });
        }

        res.json(`User with username ${user.username} deleted successfully`);
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
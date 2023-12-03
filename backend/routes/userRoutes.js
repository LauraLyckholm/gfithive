// ------------ IMPORTS ------------ //
import express from "express";
import { User } from "../models/User";
import { authenticateUser } from "../middleware/authenticateUser";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

// ------------ ROUTES ------------ //
// Creates a new router and makes it available for import in other files
export const userRouter = express();

// Creates a route only reachable for logged in users, the middleware authenticateUser is used to check if the user is logged in
userRouter.get("/dashboard", authenticateUser, (req, res) => {
    const { username } = req.user; // gets the username from the authenticated user
    res.send(`Welcome to your Dashboard, ${username}!`);
});

// Register a user
userRouter.post("/register", asyncHandler(async (req, res) => {
    // Get the username and password from the request body
    const { username, password } = req.body;

    // Validate that a username and password exists, if not, send an error to the client
    try {
        if (!username || !password) {
            res.status(400).json("Please fill in all required fields");
        };
        // Check if the user already exists in the database, by finding a user with the same username from the database
        const userExists = await User.findOne({ username });

        // If the user exists, send an error to the client, saying the user already exists
        if (userExists) {
            res.status(400).json("User with the username " + username + " already exists");
        };

        // Encrypts the password, so that no plain text passwords are stored in the database
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Create a new user with the username and hashed version of the users password
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
                // accesstoken: generateToken(newUser._id), // Generates a JWT token for the user
                accesstoken: newUser.accesstoken,
            },
        });

    } // If an error occurs, send an errormessage to the client
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
})
);

// Login a user
// userRouter.post("/login", asyncHandler(async (req, res) => {
//     // Get the username and password from the request body
//     const { username, password } = req.body;

//     try {
//         // Finds the user in the database, by the username, saves the user in the variable user
//         const user = await User.findOne({ username });

//         // If the user doesn't exist, send an error to the client
//         if (!user) {
//             res.status(401).json({ success: false, error: "User not found" });
//         }

//         // If the user exists, compare the password from the request body, with the password from the database, and save it into a variable
//         const passwordMatch = await bcrypt.compare(password, user.password);

//         // If the passwords don't match, send an error to the client
//         if (!passwordMatch) {
//             res.status(401).json({ success: false, error: "Incorrect password" });
//         }

//         // Sends a response to the client, containing the user's username, id, and a JWT token.
//         res.status(200).json({
//             success: true,
//             response: {
//                 username: user.username,
//                 id: user._id,
// //                 accessToken: generateToken(user._id), // Generates a JWT token for the user
// accesstoken: newUser.accesstoken,
//             },
//         });

//     } // If an error occurs, send an errormessage to the client 
//     catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// }));

// Creates a route for sessions - showing logged in users. The information shown is the accessToken and the user id
userRouter.post("/sessions", asyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.body.username });

    if (user && bcrypt.compare(req.body.password, user.password)) { // Compares the plaintext password from the request body with the encrypted password from the database
        res.json({ userId: user._id, accesstoken: user.accesstoken }); // Returns the user id and access token if the passwords match
    } else {
        res.json({ notFound: true })
    }
}));

import mongoose, { Schema } from "mongoose";
import crypto from "crypto";

// Schema for the user
const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 20,
            unique: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true, // Ensures that the email is stored in lowercase
            match: [/.+\@.+\..+/, "Please fill a valid email address"], // Regular expression for email validation
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 7,
            match: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
        },
        accessToken: {
            type: String,
            default: () => crypto.randomBytes(128).toString("hex")
        },
        hives: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Hive",
        }],
        gifts: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Gift"
        }]
    },
    {
        timestamps: true,
    },

);

export const User = mongoose.model("User", UserSchema);

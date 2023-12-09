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
        hive: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Hive"
        }], // Reference to Hive schema for user's hives
        items: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Gift"
        }], // Reference to Gift schema for user's gifts
    },
    {
        timestamps: true,
    },

);

export const User = mongoose.model("User", UserSchema);

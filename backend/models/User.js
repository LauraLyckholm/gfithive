import mongoose, { Schema } from "mongoose";
import crypto from "crypto";

//Example schema
export const userSchema = new Schema(
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
        accesstoken: {
            type: String,
            default: () => crypto.randomBytes(128).toString("hex"),
        },
        hive: [{
            type: Schema.Types.ObjectId,
            ref: "Hive"
        }], // Reference to Hive schema for user's hives
        items: [{
            type: Schema.Types.ObjectId,
            ref: "Gift"
        }], // Reference to Gift schema for user's gifts
    },
    {
        timestamps: true,
    },

);

export const UserModel = mongoose.model("User", userSchema);

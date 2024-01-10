import mongoose, { Schema } from "mongoose";

// Schema for the hives
const HiveSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 14,
    },
    gifts: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Gift", // Reference to Gift schema for hive's gifts
    }],
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User", // Reference to User schema for ownership
    },
    sharedBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    },
    sharedWith: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    }],
    shareToEmail: {
        type: String,
        lowercase: true, // Ensures that the email is stored in lowercase
        match: [/.+\@.+\..+/, "Please fill a valid email address"], // Regular expression for email validation
    }
},
    {
        timestamps: true,
    },
);

export const Hive = mongoose.model("Hive", HiveSchema);

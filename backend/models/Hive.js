import mongoose, { Schema } from "mongoose";

// Schema for the hives
const HiveSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    gifts: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Gift", // Reference to Gift schema for hive's gifts
    }],
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User", // Reference to User schema for ownership
    },
    sharedWith: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    }],
},
    {
        timestamps: true,
    },
);

export const Hive = mongoose.model("Hive", HiveSchema);

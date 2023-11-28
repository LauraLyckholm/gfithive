import mongoose, { Schema } from "mongoose";

// Schema for the hives
const hiveSchema = new Schema({
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
});

export const HiveModel = mongoose.model("Hive", hiveSchema);

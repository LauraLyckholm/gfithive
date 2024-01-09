import mongoose, { Schema } from "mongoose";

// Schema for the gift items
const GiftItemSchema = new Schema({
    hiveId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Hive", // Reference to the Hive schema
    },
    gift: {
        type: String,
        minlength: 2,
        maxlength: 50,
    },
    tags: {
        type: Array,
        default: []
    },
    bought: {
        type: Boolean,
        default: false,
    },
    dueDate: {
        type: Date,
        default: null,  // Set default to null if the due date is optional
    },
},
    {
        timestamps: true,
    },
);

export const Gift = mongoose.model("Gift", GiftItemSchema);

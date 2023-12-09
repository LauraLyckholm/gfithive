import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Creates a function to connect to the database through Mongoose
export const connectToMongoDB = async () => {
    try {
        const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/gifthive";
        const connection = await mongoose.connect(mongoUrl);
        console.log(`${connection.connection.name} is connected to MongoDB :)`);
    } catch (error) {
        console.log("Could not connect to MongoDB", error);
        process.exit(1);
    }
}
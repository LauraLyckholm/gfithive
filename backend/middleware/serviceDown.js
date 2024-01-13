import mongoose from "mongoose";

// Check if the service is down
export const serviceDown = (req, res, next) => {
    if (mongoose.connection.readyState === 1) {
        next();
    } else {
        res.status(503).json({ error: "Service unavailable" })
    }
}
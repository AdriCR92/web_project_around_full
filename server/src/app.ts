import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

import { router } from "./routes/index.js";
import {
    errorHandler,
    notFoundHandler,
} from "./middleware/error-handler.js";    

const app = express();
app.set("trust proxy", 1); // Trust first proxy for rate limiting
const PORT = Number(process.env.PORT) || 3001;

// Connect to MongoDB
mongoose.connect(
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/aroundb",
    {
        maxPoolSize: 5,
    }
)
    .then(() => {
        console.log("Conectad a MongoDB");
    })
    .catch((err) => {
        console.error("Error connectando a MongoDB:", err);
    });

// Middleware to parse JSON request bodies
app.use(express.json());

// Allow requests from this origin
app.use(
    cors({
        origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    })
);

// Health check endpoint
app.get("/health", (_req, res) => {
    res.status(200).json({ status: "OK" });
});

// Use routers for different routes
app.use(router);

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`App esta corriendo en el puerto ${PORT}`);
});
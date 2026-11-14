import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { router } from "./routes/index.js";
import {
    errorHandler,
    notFoundHandler,
} from "./middleware/error-handler.js";    

const app = express();
const PORT = 3001;

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/aroundb")
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
        origin: "http://localhost:3000", 
    })
);

// Use routers for different routes
app.use(router);

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`App esta corriendo en el puerto ${PORT}`);
});
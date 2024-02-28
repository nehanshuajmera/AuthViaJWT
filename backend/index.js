import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
const PORT = process.env.PORT || 5000;
config();
const app = express();

import { gameRouter } from "./routes/gameRoute.js";
import { authorRouter } from "./routes/authorRoute.js";
import { reviewRouter } from "./routes/reviewRoute.js";

// middleware
let reqCount = 0;
app.use((req, res, next) => {
    reqCount++;
    console.log(`Requested: ${req.url} and the request count is: ${reqCount}`);
    next();
}); 

// routes
app.use("/api/game", gameRouter);
app.use("/api/author", authorRouter);
app.use("/api/review", reviewRouter);

app.use(express.json());
app.use(cors());

const connect = async () => {
    await mongoose.connect(process.env.DB);
    try {
        console.log("Connected to database");

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("Error connecting to database", err?.message);
    }
};
connect();

// global catches
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
})
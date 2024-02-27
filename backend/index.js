import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
const PORT = process.env.PORT || 5000;
config();
const app = express();

app.use(express.json());

const connect = async () => {
    await mongoose.connect(process.env.DB);
    try {
        console.log("Connected to database");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Error connecting to database", err?.msg);
    }
};

connect();

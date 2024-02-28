import mongoose from "mongoose";
import { Review } from "../models/reviewModel.js";

export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getReview = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send("No review with that id");
        }
        const review = await Review.findById({ _id: id });
        if (!review) {
            return res.status(404).send("No review with that id");
        }
        res.status(200).json(review);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const createReview = async (req, res) => {
    const review = req.body;
    try {
        const newReview = await Review.create(review);
        res.status(201).json(newReview);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

export const updateReview = async (req, res) => {
    const { id } = req.params;
    const review = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send("No review with that id");
        }
        const updatedReview = await Review.findByIdAndUpdate(id, review, { new: true });
        if (!updatedReview) {
            return res.status(404).send("No review with that id");
        }
        res.status(200).json(updatedReview);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const deleteReview = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send("No review with that id");
        }
        await Review.findByIdAndRemove(id);
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
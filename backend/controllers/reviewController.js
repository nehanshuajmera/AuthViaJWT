import mongoose from "mongoose";
import { Review } from "../models/reviewModel.js";
import { Game } from "../models/gameModel.js";
import { Author } from '../models/authorModel.js'

export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate('game').populate('author').exec();
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
    const { rating, content, game: gameId, author: authorId } = req.body;
    try {
        if (!gameId || !authorId) {
            return res.status(404).send("Game or Author not found");
        }
        const gameExists = await Game.findById(gameId).populate('reviews');
        const authorExists = await Author.findById(authorId).populate('reviews');

        if (!gameExists || !authorExists) {
            return res.status(404).send("Game or Author not found");
        }

        const newReview = await Review.create({ rating, content, game: gameId, author: authorId });

        gameExists.reviews.push(newReview._id);
        await gameExists.save();

        authorExists.reviews.push(newReview._id);
        await authorExists.save();

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
        const updatedReview = await Review.findByIdAndUpdate(id, review, {
            new: true,
        });
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

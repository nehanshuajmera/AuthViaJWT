import mongoose from "mongoose";
import { Game } from "../models/gameModel.js";

export const getGames = async (req, res) => {
    try {
        const games = await Game.find().populate('reviews').exec();
        res.status(200).json(games);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getGame = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send("No game with that id");
        }
        const game = await Game.findById(id).populate('reviews').exec();
        if (!game) {
            return res.status(404).send("No game with that id");
        }
        res.status(200).json(game);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const createGame = async (req, res) => {
    const game = req.body;
    try {
        const newGame = await Game.create(game);
        res.status(201).json(newGame);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const updateGame = async (req, res) => {
    const { id } = req.params;
    const game = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send("No game with that id");
        }
        const updatedGame = await Game.findByIdAndUpdate(id, game, { new: true });
        if (!updatedGame) {
            return res.status(404).send("No game with that id");
        }
        res.status(200).json(updatedGame);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const deleteGame = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send("No game with that id");
        }
        await Game.findByIdAndDelete(id);
        res.status(200).json({ message: "Game deleted successfully" });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
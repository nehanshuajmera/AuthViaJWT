import mongoose from 'mongoose';
import { Author } from '../models/authorModel.js';

export const getAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json(authors);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getAuthor = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send("No author with that id");
        }
        const author = await Author.findById({ _id: id });
        if (!author) {
            return res.status(404).send("No author with that id");
        }
        res.status(200).json(author);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const createAuthor = async (req, res) => {
    const author = req.body;
    try {
        const newAuthor = await Author.create(author);
        res.status(201).json(newAuthor);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

export const updateAuthor = async (req, res) => {
    const { id } = req.params;
    const author = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid({ _id: id })) {
            return res.status(404).send("No author with that id");
        }
        const updatedAuthor = await Author.findByIdAndUpdate(id, author, { new: true });
        if (!updatedAuthor) {
            return res.status(404).send("No author with that id");
        }
        res.status(200).json(updatedAuthor);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const deleteAuthor = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid({ _id: id })) {
            return res.status(404).send("No author with that id");
        }
        await Author.findByIdAndRemove(id);
        res.status(200).json({ message: "Author deleted successfully" });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
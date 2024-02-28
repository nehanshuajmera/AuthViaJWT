import express from "express";
import { getAuthor, getAuthors, createAuthor, updateAuthor, deleteAuthor } from "../controllers/authorController.js";
const router = express.Router();

router.get('/', getAuthors);
router.get('/:id', getAuthor);
router.post('/', createAuthor);
router.patch('/:id', updateAuthor);
router.delete('/:id', deleteAuthor);

export const authorRouter = router;
import express from 'express';
const router = express.Router();
import { loginUser, signupUser } from '../controllers/userController.js';

// Login
router.post('/login', loginUser);

// Register
router.post('/signup', signupUser);

export const userRouter = router;
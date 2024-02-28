import express from 'express';
const router = express.Router();
import { loginUser, registerUser } from '../controllers/userController.js';

// Login
router.post('/login', loginUser);

// Register
router.post('/register', registerUser);

export const userRouter = router;
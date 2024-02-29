import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3h' });
}

// login
export const loginUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.login(username, email, password);

        const token = createToken(user.id);
        res.status(200).json({ username, email, token });
    }
    catch (err) {
        res.status(400).json(`Error: ${err.message}`);
    }
};

// Register
export const signupUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.signUp(username, email, password);

        const token = createToken(user.id);
        res.status(200).json({ username, email, token });
    }
    catch (err) {
        res.status(400).json(`Error: ${err.message}`);
    }
}
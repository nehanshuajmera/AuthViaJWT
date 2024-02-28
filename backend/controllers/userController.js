import mongoose from 'mongoose';
import { User } from '../models/userModel.js';

// login
export const loginUser = async (req, res) => {

};

// Register
export const registerUser = async (req, res) => {
    const {username, password} = req.body;

    try{
        const user = await User.signUp(username, password);
        res.status(200).json({username, user});
    }
    catch(err){
        res.status(400).json(`Error: ${err.message}`);
    }
}
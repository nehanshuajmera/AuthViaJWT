import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.statics.signUp = async function (username, email, password) {
    if (!username || !email || !password) {
        throw new Error("All fields must be filled");
    }
    else if (!validator.matches(username, "^[a-z0-9_.-]{8,}$")) {
        throw new Error("username is not valid");
    }
    else if (!validator.isEmail(email)) {
        throw new Error("Email is not valid");
    }
    else if (
        !validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            returnScore: false
        })
    ) {
        throw new Error("Password not strong enough");
    }

    const exists = await this.findOne({ username, email });
    if (exists) {
        throw new Error("Username or Email already in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ username, email, password: hash });
    return user;
};

userSchema.statics.login = async function(username, email, password){

    if(!username && !email){
        throw new Error("Username or Email is required");
    }

    if(!password){
        throw new Error("Password is required");
    }

    const user = await this.findOne({ $or: [{ username }, { email }] });
    if (!user) {
        throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    return user;
}

export const User = mongoose.model("User", userSchema);

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

userSchema.statics.signUp = async function (username, password) {
    if (!username || !password) {
        throw new Error("All fields must be filled");
    }

    if (!validator.matches(username, "^[a-z0-9_.-]*$")) {
        console.log("Username not valid");
        throw new Error("username is not valid");
    } else {
        console.log("Good Username!");
    }
    if (
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

    const exists = await this.findOne({ username });
    if (exists) {
        throw new Error("Username already in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ username, password: hash });
    return user;
};

export const User = mongoose.model("User", userSchema);

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const gameSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        platform: {
            type: [String],
            required: true,
        },
        reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: "Review",
            },
        ],
    },
    { timestamps: true }
);

export const Game = mongoose.model("Game", gameSchema);
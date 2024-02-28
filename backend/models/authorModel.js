import mongoose from "mongoose";
const Schema = mongoose.Schema;

const authorSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        verified: {
            type: Boolean,
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

export const Author = mongoose.model("Author", authorSchema);
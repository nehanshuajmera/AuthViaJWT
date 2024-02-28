import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    game: {
        type: Schema.Types.ObjectId,
        ref: 'Game',
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    }
}, { timestamps: true });

export const Review = mongoose.model('Review', reviewSchema);
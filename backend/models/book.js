import mongoose from 'mongoose';
import { reviewSchema } from './review.js';

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        require: true,
    },
    isbn: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    description: {
        type: String,
    },
    rating: {
        type: Number,
    },
    numReviews: {
        type: Number,
    },
    reviews: [reviewSchema],
});

const Book = mongoose.model('Book', bookSchema);

export default Book;

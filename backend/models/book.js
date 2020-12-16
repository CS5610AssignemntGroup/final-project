import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        required: true,
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
    reviews: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Review',
    },
});

const Book = mongoose.model('Book', bookSchema);

export default Book;

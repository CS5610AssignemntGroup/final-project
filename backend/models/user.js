const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        require: true,
    },
    brand: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 9,
    },
    stockCount: {
        type: Number,
        required: true,
        default: 0,
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    rateNum: {
        type: Number,
        required: true,
        default: 0,
    },
    reviews: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Review',
    },
});

const User = mongoose.model('User', userSchema);
export default User; 

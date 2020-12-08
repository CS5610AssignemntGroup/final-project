const mongoose = require('mongoose');
// const User = require('./user')

const Schema = mongoose.Schema;

const productSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: "User"
    }, 
    brand:{
        type: String,
        required: true
    }, 
    image:{
        type: String,
        required: true
    }, 
    category:{
        type: String,
        required: true
    }, 
    description:{
        type: String,
        required: true
    }, 
    price:{
        type: Number,
        required: true
    }, 
    stockCount:{
        type: Number,
        required: true
    }, 
    rating:{
        type: Number,
        required: true
    }, 
    rateNum:{
        type: Number,
        required: true
    }, 
    reviews: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: "Review"
    }
});

module.exports = mongoose.model("Product", productSchema);
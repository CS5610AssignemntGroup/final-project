import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    items: [
        {
            book: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Book',
            },
        },
    ],
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

export default Favorite;

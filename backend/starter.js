import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import books from './data/books.js';
import User from './models/user.js';
import Book from './models/book.js';

dotenv.config();
mongoose
    .connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
    })
    .catch(err => {
        console.log(err);
    });

const importData = async () => {
    try {
        await Book.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        console.log(createdUsers);
        const adminUser = createdUsers[0]._id;

        const sampleBooks = books.map(book => {
            return { ...book, user: adminUser };
        });

        await Book.insertMany(sampleBooks);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};
importData();

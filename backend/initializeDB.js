import { UserInputError } from 'apollo-server';
import mongoose from 'mongoose';

import Product from './models/product';
import User from './models/user';
import Order from './models/order';

import preProduct from './preData/product_preData';
import preUsers from './preData/user_preData';
import product from './models/product';

const keys = require('./config/keys');

mongoose.connect(keys.MONGO_URI).catch(err => {
    console.log(err);
});

const clearDB = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();
        await Order.deleteMany;

        console.log('Database is clear');
        process.exit();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

const insertPreData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();
        await Order.deleteMany;

        const insertPreUsers = await User.insertMany(preUsers);

        const createAdmin = insertPreUsers[0]._id;

        const modifyPreProducts = preProduct.map(product => {
            return { ...product, user: createAdmin };
        });

        await Product.insertMany(modifyPreProducts);

        console.log('DB is initilized with sample data');
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    clearDB();
} else {
    insertPreData();
}

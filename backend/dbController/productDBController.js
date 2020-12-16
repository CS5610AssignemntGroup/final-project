import asyncHandler from 'express-async-handler';
import Product from '../models/product.js';

// const { Product } = require('../models/product');

//insert product
//POST /api/products
// Admin authorization
const insertProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        user: req.user._id,
        name: 'bookName',
        brand: 'brandName',
        image: '/images/sample.jpg',
        category: 'categoryName',
        description: 'descriptionContent',
        price: 0,
        stockCount: 0,
        rateNum: 0,
    });

    const newProduct = await product.save();
    res.status(201).json(newProduct);
});

//delete prduct by id
//DELETE /api/products/:id
//Admin authorization
const deleteProductById = asyncHandler(async (req, res) => {
    const targetProduct = await Product.findById(req.params.id);

    if (targetProduct) {
        await targetProduct.remove();
        res.json({ message: 'Removed.' });
    } else {
        res.status(404);
        throw new Error('Can not find this product.');
    }
});

// update product by id
// PUT /api/products/:id
// Admin authorization
const updateProductById = asyncHandler(async (req, res) => {
    const {
        name,
        brand,
        image,
        category,
        description,
        price,
        stockCount,
    } = req.body;

    const productById = await Product.findById(req.params.id);

    if (productById) {
        productById.name = name;
        productById.brand = brand;
        productById.image = image;
        productById.category = category;
        productById.description = description;
        productById.price = price;
        productById.stockCount = stockCount;

        const newProduct = await productById.save();
        res.json(newProduct);
    } else {
        res.status(404);
        throw new Error('Cannot find this product.');
    }
});

// get product by id
// GET /api/products/:id
const getProductById = asyncHandler(async (req, res) => {
    const result = await Product.findById(req.params.id);

    if (result) {
        res.json(result);
    } else {
        res.status(404);
        throw new Error('Product is not existed.');
    }
});

// Get all products
// GET /api/products
const getAllProducts = asyncHandler(async (req, res) => {
    const totalPage = 15;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
        ? {
              name: {
                  $regex: req.query.keyword,
                  $options: 'i',
              },
          }
        : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
        .limit(totalPage)
        .skip(totalPage * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / totalPage) });
});

// insert review for product
// POST /api/prducts/:id/reviews
const insertProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const productById = await Product.findById(req.params.id);

    if (productById) {
        const reviewed = productById.reviews.find(
           (r) => r.user.toString() === req.user._id.toString()
        );

        if (reviewed) {
            res.status(400);
            throw new Error('Reviewed this product.');
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment: comment,
            user: req.user._id,
        };

        productById.reviews.push(review);
        productById.rateNum = productById.reviews.length;
        productById.rating =
            productById.reviews.reduce((acc, item) => item.rating + acc, 0) /
            productById.reviews.length;

        await productById.save();
        res.status(201).json({ message: 'Added review to product.' });
    } else {
        res.status(404);
        throw new Error('Can not find this product.');
    }
});

const getTopRatedProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(5);

    res.json(products);
});

export {
    insertProduct,
    deleteProductById,
    updateProductById,
    getAllProducts,
    getProductById,
    insertProductReview,
    getTopRatedProducts,
};

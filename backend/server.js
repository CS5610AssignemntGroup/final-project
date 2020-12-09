const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const Product = require('./models/product');

const app = express();

app.use(bodyParser.json());

app.use(
    '/graphql',
    graphqlHTTP({
        schema: buildSchema(`
            type Product {
                _id: ID!
                name: String!
                image: String!
                brand: String!
                category: String!
                description: String
                rating: Float
                reviewCount: Int
                price: Float!
                stockCount: Int!
            }

            input ProductInput {
                name: String!
                image: String!
                brand: String!
                category: String!
                description: String
                rating: Float
                reviewCount: Int
                price: Float!
                stockCount: Int!
            }

            type RootQuery{
                getAllProducts: [Product!]!
            }

            type RootMutation {
                addProduct(productInput: ProductInput): Product
            }

            schema {
                query: RootQuery
                mutation: RootMutation
            }
        `),
        rootValue: {
            getAllProducts: () => {
                return Product.find()
                    .then(products => {
                        return products.map(product => {
                            return { ...product._doc, _id: product.id };
                        });
                    })
                    .catch(err => {
                        throw err;
                    });
            },
            addProduct: args => {
                const product = new Product({
                    // user: args.productInput.user,
                    name: args.productInput.name,
                    image: args.productInput.image,
                    brand: args.productInput.brand,
                    category: args.productInput.category,
                    description: args.productInput.description,
                    rating: args.productInput.rating,
                    reviewCount: args.productInput.reviewCount,
                    price: +args.productInput.price,
                    stockCount: args.productInput.stockCount,
                    // reviews: args.productInput.reviews
                });

                return product
                    .save()
                    .then(result => {
                        console.log(result);

                        // return result;
                        return { ...result._doc, _id: product.id };
                    })
                    .catch(err => {
                        console.log(err);
                        throw err;
                    });
            },
        },
        graphiql: true,
    })
);

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.0md4f.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
    )
    .then(() => {
        app.listen(process.env.PORT || 4000, () =>
            console.log(`server start at port: ${process.env.PORT}`)
        );
    })
    .catch(err => {
        console.log(err);
    });

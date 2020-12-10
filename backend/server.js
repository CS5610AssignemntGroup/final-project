const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const Product = require('./models/product');
const cors = require('cors');
const keys = require('./config/keys');

const app = express();

app.use(cors());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});
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

mongoose.connect(keys.MONGO_URI).catch(err => {
    console.log(err);
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../frontend/build'));

    //if not found in client/build
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(__dirname, '../frontend', 'build', 'index.html')
        );
    });
}

app.listen(process.env.PORT || 4000, () =>
    console.log(`server start at port: ${process.env.PORT}`)
);

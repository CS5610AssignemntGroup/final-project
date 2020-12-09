const { ApolloServer, gql } = require('apollo-server-express');

module.exports = productTypeDef => gql`
    type Query {
        products: [Product!]!
    }

    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    type Product {
        _id: ID!
<<<<<<< HEAD
        user: [User!]!
        brand: String!
        image: String!
        category: String!
        description: String!
=======
        // user: [User!]!
        brand: String! 
        image: String! 
        category: String! 
        description: String! 
>>>>>>> manzhang
        price: Float!
        stockCount: Float!
        rating: Float!
        rateNum: Float!
        // reviews: [Review!]!
    }

    type Mutation {
<<<<<<< HEAD
        addProduct(
            user: [User!]!
            brand: String!
            image: String!
            category: String!
            description: String!
=======
        addProduct( 
            // user: [User!]!
            brand: String! 
            image: String! 
            category: String! 
            description: String! 
>>>>>>> manzhang
            price: Float!
            stockCount: Float!
            rating: Float!
            rateNum: Float!
            // reviews: [Review!]!
        ): Product!
    }
`;

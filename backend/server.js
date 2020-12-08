const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose')

const { productTypeDef } = require("./typeDefs/productTypeDef")
const { productResolver } = require("./resolvers/productResolver")

const productSchema = {
    typeDefs: productTypeDef, 
    resolvers: productResolver
}

const startServer = async () => {
    const serverApp = express();
    const server = new ApolloServer({
        schema: productSchema,
        playground: true
        
    });
    server.applyMiddleware({ 
        app: serverApp,
        path: '/'
    }); 

    serverApp.use(express.json)

    await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.0md4f.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
                    .then(() => {
                        app.listen({ port: 4000 }, () => console.log(`server starts at: http://localhost:4000${server.graphqlPath}`));
                    })
                    .catch(err => {
                        console.log(err);
                    });
};

startServer();

console.log("test")

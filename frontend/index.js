console.log("test test")

const { ApolloServer, gql } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schema");
const express = require("express");

const app = express();

const server = new ApolloServer({
    typeDefs, 
    resolvers
});



server.applyMiddleware({ app }); 

app.listern({port: 5000}, () => console.log(`server starts at: http://localhost:5000${server.graphqlPath}`))
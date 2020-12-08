const { ApolloServer, gql } = require('apollo-server-express');
// const { typeDefs, resolvers } = require("./schema");
const express = require('express');
const mongoose = require('mongoose')

const { productTypeDef } = require("./typeDefs/productTypeDef")
const { productResolver } = require("./resolvers/productResolver")


const startServer = async () => {
    const app = express();
    const server = new ApolloServer({
        productTypeDef, 
        productResolver
    });
    server.applyMiddleware({ app }); 

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












const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const Event = require('./models/event')

const app = express();

// const events = [];

app.use(bodyParser.json());

app.use(
    '/graphql', 
    graphqlHTTP({
        schema: buildSchema(`
            type Event {
                _id: ID!
                title: String!
                description: String!
                price: Float!
                date: String!
            }

            input EventInput {
                title: String!
                description: String!
                price: Float!
                date: String!
            }

            type RootQuery{
                events: [Event!]!
            }

            type RootMutation {
                createEvent(eventInput: EventInput): Event
            }

            schema {
                query: RootQuery
                mutation: RootMutation
            }
        `),  
        rootValue: {
            events: () => {
                // return events;

                return Event.find()
                    .then(events => {
                        return events.map(event => { 
                            // return {...event._doc, _id: event._doc._id.toString() }; 
                            return {...event._doc, _id: event.id }; 
                        })
                    }).catch(err => {
                        throw err;
                    });
            }, 
            createEvent: args => {
                // const event = {
                //     _id: Math.random.toString(), 
                //     title: args.eventInput.title, 
                //     description: args.eventInput.description, 
                //     price: args.eventInput.price,
                //     date: args.eventInput.date
                // };

                // events.push(event);

                // return event; 

                const event = new Event({
                    title: args.eventInput.title, 
                    description: args.eventInput.description, 
                    price: +args.eventInput.price,
                    date: new Date(args.eventInput.date)
                });

                return event.save().then(result => {
                    console.log(result);

                    // return result;
                    return {...result._doc, _id: event.id};
                }).catch(err => {
                    console.log(err);
                    throw err;
                });
            }
        }, 
        graphiql: true,
    })
);

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.0md4f.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(5000, () => console.log(`server start at port: 5000`))
    })
    .catch(err => {
        console.log(err);
    });


/**
 * 
 mutation {
  createEvent(eventInput: {title: "test1", description: "desc1", price: 23.99, date: "2020-12-08T07:14:35.727Z"}) {
    title
    description
  }
}

query {
  events {
    title
    description
  }
}

 * 
 * 
 */
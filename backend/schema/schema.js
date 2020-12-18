import graphql, { GraphQLFloat } from 'graphql';
import Book from '../models/book.js';
import { Review } from '../models/review.js';

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        isbn: { type: GraphQLString },
        image: { type: GraphQLString },
        description: { type: GraphQLString },
        rating: { type: GraphQLFloat },
        numReviews: { type: GraphQLInt },
        reviews: {
            type: new GraphQLList(ReviewType),
        },
    }),
});

const ReviewType = new GraphQLObjectType({
    name: 'Review',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        rating: { type: GraphQLFloat },
        comment: { type: GraphQLString },
        user: { type: UserType },
    }),
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Book.findById(args.id);
            },
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({});
            },
        },
    },
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // addReview: {
        //     type: ReviewType,
        //     args: {
        //         name: { type: GraphQLString },
        //         age: { type: GraphQLInt },
        //     },
        //     resolve(parent, args) {
        //         let review = new Review({
        //             name: args.name,
        //             age: args.age,
        //         });
        //         return review.save();
        //     },
        // },
        // addBook: {
        //     type: BookType,
        //     args: {
        //         name: { type: new GraphQLNonNull(GraphQLString) },
        //         genre: { type: new GraphQLNonNull(GraphQLString) },
        //         reviewId: { type: new GraphQLNonNull(GraphQLID) },
        //     },
        //     resolve(parent, args) {
        //         let book = new Book({
        //             name: args.name,
        //             genre: args.genre,
        //             reviewId: args.reviewId,
        //         });
        //         return book.save();
        //     },
        // },
    },
});

const graphqlSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});

export { graphqlSchema };

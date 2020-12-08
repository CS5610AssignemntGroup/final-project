import { Cat } from "./Cat"

const { Product } = require("../models/product")

export const resolvers = {
    Query: {
        products: Product.find()
    }, 
    Mutation: {
        createCat: async (_, args) => {
            const newProduct = new Product({ name });
            await kitty.save();
            console.log(kitty)

            return kitty;
        }
    }
}
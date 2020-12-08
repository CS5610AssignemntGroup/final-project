const { Product } = require("../models/product")

const productResolver = {
    Query: {
        products: () => Product.find()
    }, 
    Mutation: {
        createCat: async (_, {brand} ) => {
            const newProduct = new Product({ brand });
            await newProduct.save();
            console.log(newProduct)

            return newProduct;
        }
    }
}

module.exports = productResolver;


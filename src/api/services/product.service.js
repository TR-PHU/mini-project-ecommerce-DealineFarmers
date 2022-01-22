const Product = require('../models/product');
const CreateError = require('http-errors');

module.exports = {
    getProductById: async (productId) => {
        try {
            const res = await Product.find({ _id: productId });
            console.log(res);
            if (!res) {
                throw new CreateError(404, 'Product not found!');
            }
            return res;
        } catch (error) {
            if (error) throw error;
            throw new CreateError(500, 'Internal server errors');
        }
    },
    createProduct: async (body) => {
        try {
            const { name, image, price, categories, quantity, description, rating } = body;
            const res = await Product.create({
                name,
                image,
                price,
                quantity,
                description,
                rating,
                categories,
            });

            return {
                statusCode: 201,
                msg: 'ok',
            };
        } catch (error) {
            throw new CreateError(500, 'Internal server errors');
        }
    },
    getAllProduct: async (qPage) => {
        const PAGE_SIZE = 12;
        try {
            if (qPage) {
                qPage = parseInt(qPage);
                qPage < 1 ? (qPage = 1) : qPage;
                const startIndex = (qPage - 1) * PAGE_SIZE;
                const products = await Product.find().skip(startIndex).limit(PAGE_SIZE);
                return {
                    statusCode: 200,
                    products,
                };
            } else {
                const products = await Product.find();
                return {
                    statusCode: 200,
                    products,
                };
            }
        } catch (error) {
            throw new CreateError(error);
        }
    },
    deleteProductById: async (id) => {
        try {
            const res = await Product.deleteOne({ _id: id });

            console.log(res);
            return {
                statusCode: 202,
                msg: 'Delete Success!',
            };
        } catch (error) {
            throw new CreateError(500, 'Internal server errors');
        }
    },
    updateProductById: async (id, body) => {
        try {
            const { name, description, image, price, quantity, rating, catagories } = body;
            console.log(catagories);
            const res = await Product.updateOne(
                { _id: id },
                {
                    $set: {
                        name,
                        description,
                        image,
                        price,
                        quantity,
                        rating,
                        catagories,
                    },
                }
            );

            return {
                statusCode: 204,
                msg: 'ok',
            };
        } catch (error) {
            throw new CreateError(500, 'Interval server errors');
        }
    },
};

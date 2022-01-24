const createError = require('http-errors');
const Order = require('../models/order');
const Product = require('../models/product');

const searchProduct = async (productId) => {
    const product = await Product.findById(productId);
    return product;
};

module.exports = {
    addOrder: async (userId, products) => {
        try {
            const order = await Order.updateOne(
                { userId },
                {
                    $push: {
                        products: { $each: [...products] },
                    },
                }
            );
            return {
                statusCode: 200,
                message: 'Payment success',
            };
        } catch (error) {
            if (error) throw new createError(error);
            throw new createError(500, 'Interval server errors');
        }
    },
    getOrder: async(id) => {
        try {
            let res = await Order.find({ userId: id });

            if (res.length == 0) {
                return [];
            }
            let count = 0;
            let resDB = [];

            for (let i of res[0].products) {
                let x = await Product.findById(i.productId);
                if (x !== null) {
                    resDB[count] = x;
                    resDB[count].quantity = i.quantity;
                    resDB[count].price = i.price;
                    count++;
                }
                if (count === res[0].products.length) {
                    return {
                        statusCode: 200,
                        message: 'Getting order successful',
                        order: resDB,
                    };
                }
            }
            
            return res;
        } catch (error) {
            throw new createError(error);
        }
    },
};

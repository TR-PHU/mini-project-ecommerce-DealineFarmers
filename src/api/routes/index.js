const router = require('express').Router();
const authRoute = require('./auth.route');
const productRoute = require('./product.route');
const cartRoute = require("./cart.route")

router.use('/auth', authRoute);

router.use('/product', productRoute);

router.get('/cart', cartRoute);
module.exports = router;

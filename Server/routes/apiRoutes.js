const router = require('express').Router();
const baseURL = '/api/v1';

const authRoutes = require(`./api/auth`);
const brandRouter = require(`./api/brand`);
const categoryRouter = require(`./api/category`);
const productRouter = require(`./api/product`);
const userRoutes = require(`./api/user`);
const reviewRoutes = require(`./api/review`);
const addressRoutes = require(`./api/address`);
const merchantRoutes = require(`./api/merchant`);
const wishlistRouter = require('./api/wishlist');
const cartRouter = require('./api/cart');

router.use(`${baseURL}/auth`, authRoutes);
router.use(`${baseURL}/users`, userRoutes);
router.use(`${baseURL}/products`, productRouter);
router.use(`${baseURL}/categories`, categoryRouter);
router.use(`${baseURL}/brands`, brandRouter);
router.use(`${baseURL}/reviews`, reviewRoutes);
router.use(`${baseURL}/address`, addressRoutes);
router.use(`${baseURL}/merchant`, merchantRoutes);
router.use(`${baseURL}/wishlists`, wishlistRouter);
router.use(`${baseURL}/cart`, cartRouter);

module.exports = router;

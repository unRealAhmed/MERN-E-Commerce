const express = require('express');
const { protect } = require('../../controllers/auth');
const { addToWishlist, removeFromWishlist, getUserWishlist } = require('../../controllers/wishlist');

const wishlistRouter = express.Router();

wishlistRouter.use(protect);

wishlistRouter.patch('/', addToWishlist);
wishlistRouter.delete('/', removeFromWishlist);
wishlistRouter.get('/', getUserWishlist);

module.exports = wishlistRouter;

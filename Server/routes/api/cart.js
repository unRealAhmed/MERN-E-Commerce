const express = require('express');
const { addToCart, updateQuantity, removeProductFromCart, getUserCart } = require('../../controllers/cart');
const { protect } = require('../../controllers/auth');

const cartRouter = express.Router();

cartRouter.use(protect);

cartRouter.post('/', addToCart);
cartRouter.get('/', getUserCart);
cartRouter.put('/:product', updateQuantity);
cartRouter.delete('/:product', removeProductFromCart);

module.exports = cartRouter;

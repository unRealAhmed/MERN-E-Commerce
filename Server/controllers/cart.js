const cartModel = require("../models/cart");
const productModel = require("../models/product");
const AppError = require("../utils/appErrors");
const asyncHandler = require("../utils/asyncHandler");

function calculateTotalPrice(cart) {
    let totalPrice = 0;
    cart.cartItems.forEach(ele => {
        totalPrice += ele.quantity * ele.price;
    });
    cart.totalPrice = totalPrice;
}

const addToCart = asyncHandler(async (req, res, next) => {
    const product = await productModel.findById(req.body.product);

    if (!product) {
        return next(new AppError("Product not found", 404));
    }

    req.body.price = product.price;
    const cart = await cartModel.findOne({ user: req.user._id });

    if (!cart) {
        const newCart = new cartModel({
            user: req.user._id,
            cartItems: [req.body],
            price: req.body.price,
        });

        await newCart.save();
        res.json({ success: true, message: "Product added to cart successfully", cart: newCart });
    }

    const existingItem = cart.cartItems.find((ele) => ele.product == req.body.product);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.cartItems.push(req.body);
    }

    calculateTotalPrice(cart);
    await cart.save();
    res.json({ success: true, message: "Product added to cart successfully", cart });
});

const updateQuantity = asyncHandler(async (req, res, next) => {
    const product = await productModel.findById(req.params.product);

    if (!product) {
        return next(new AppError("Product not found", 404));
    }

    const cart = await cartModel.findOne({ user: req.user._id });
    const item = cart.cartItems.find((ele) => ele.product == req.params.product);

    if (item) {
        item.quantity = req.body.quantity;
    }

    calculateTotalPrice(cart);
    await cart.save();
    res.json({ success: true, message: "Cart updated successfully", cart });
});

const removeProductFromCart = asyncHandler(async (req, res, next) => {
    const cart = await cartModel.findOneAndUpdate({ user: req.user._id }, { $pull: { cartItems: { product: req.params.product } } }, { new: true });

    if (!cart) {
        return next(new AppError("Product not found or Cart not found", 404));
    }

    calculateTotalPrice(cart);
    await cart.save();
    res.json({ success: true, message: "Product removed from cart successfully", cart });
});

const getUserCart = asyncHandler(async (req, res, next) => {
    const cart = await cartModel.findOne({ user: req.user._id });

    if (!cart) {
        return next(new AppError("Cart not found", 404));
    }

    res.json({ success: true, message: "Cart retrieved successfully", cart });
});

module.exports = {
    addToCart,
    updateQuantity,
    removeProductFromCart,
    getUserCart,
};

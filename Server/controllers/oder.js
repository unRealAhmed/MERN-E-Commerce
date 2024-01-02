const cartModel = require("../models/cart");
const orderModel = require("../models/order");
const productModel = require("../models/product");
const AppError = require("../utils/appErrors");
const asyncHandler = require("../utils/asyncHandler");

const createOrder = asyncHandler(async (req, res, next) => {
    const cart = await cartModel.findOne({ user: req.user._id });

    if (!cart) {
        return next(new AppError("You do not have a cart", 404));
    }

    const totalPriceOfOrder = cart.totalPrice;

    const order = new orderModel({
        user: req.user._id,
        cartItems: cart.cartItems,
        shippingAdress: req.body.shippingAdress,
    });

    await order.save();

    if (order) {
        const updateOptions = cart.cartItems.map(element => ({
            updateOne: {
                filter: { _id: element.product },
                update: { $inc: { quantity: -element.quantity, sold: element.quantity } },
            },
        }));

        await productModel.bulkWrite(updateOptions);
        await cartModel.findByIdAndDelete(cart._id);
    }

    res.json({ success: true, message: "Order created successfully", order });
});

const getUserOrder = asyncHandler(async (req, res, next) => {
    const orders = await orderModel.find({ user: req.user._id });

    if (!orders.length) {
        return next(new AppError("No orders found for the user", 404));
    }

    res.json({ success: true, message: "User orders retrieved successfully", orders });
});

const getAllOrder = asyncHandler(async (req, res) => {
    const orders = await orderModel.find({});
    res.json({ success: true, message: 'All orders retrieved successfully', orders });
});

module.exports = {
    createOrder,
    getUserOrder,
    getAllOrder,
};

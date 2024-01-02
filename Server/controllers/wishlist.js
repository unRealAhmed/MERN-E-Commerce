const User = require("../models/User");
const AppError = require("../utils/appErrors");
const asyncHandler = require("../utils/asyncHandler");

const addToWishlist = asyncHandler(async (req, res, next) => {
    const { product } = req.body;

    if (!product) {
        return next(new AppError("Product is required for adding to the wishlist.", 400));
    }

    const userWishlist = await User.findByIdAndUpdate(req.user._id, { $addToSet: { wishlist: product } }, { new: true });

    if (!userWishlist) {
        return next(new AppError(`User with ID ${req.user._id} not found.`, 403));
    }

    res.json({ success: true, message: "Product added to wishlist successfully.", wishlist: userWishlist.wishlist });
});

const removeFromWishlist = asyncHandler(async (req, res, next) => {
    const { product } = req.body;

    if (!product) {
        return next(new AppError("Product is required for removing from the wishlist.", 400));
    }

    const userWishlist = await User.findByIdAndUpdate(req.user._id, { $pull: { wishlist: product } }, { new: true });

    if (!userWishlist) {
        return next(new AppError(`User with ID ${req.user._id} not found.`, 403));
    }

    res.json({ success: true, message: "Product removed from wishlist successfully.", wishlist: userWishlist.wishlist });
});

const getUserWishlist = asyncHandler(async (req, res, next) => {
    const userWishlists = await User.findById(req.user._id);

    if (!userWishlists) {
        return next(new AppError(`User with ID ${req.user._id} not found.`, 403));
    }

    res.json({ success: true, message: "Wishlist retrieved successfully.", wishlist: userWishlists.wishlist });
});

module.exports = {
    addToWishlist,
    removeFromWishlist,
    getUserWishlist
};

const User = require("../models/User");
const AppError = require("../utils/appErrors");
const asyncHandler = require("../utils/asyncHandler");


const addToWishlist =asyncHandler(async (req,res,next)=>{
    const {product}=req.body
    const userWishlist=await User.findByIdAndUpdate(req.user._id,{$addToSet:{wishlist:product}},{new:true})
    !userWishlist && next(new AppError("User Not Found",403))
    userWishlist && res.json({message:"success",wishlist:userWishlist.wishlist})

})

const removeFromWishlist =asyncHandler(async (req,res,next)=>{
    const {product}=req.body
    const userWishlist=await User.findByIdAndUpdate(req.user._id,{$pull:{wishlist:product}},{new:true})
    !userWishlist && next(new AppError("User Not Found",403))
    userWishlist && res.json({message:"success",wishlist:userWishlist.wishlist})

})

const getUserWishlist =asyncHandler(async (req,res,next)=>{
    const userWishlists=await User.findById(req.user._id)
    !userWishlists && next(new AppError("User Not Found",403))
    userWishlists && res.json({message:"success",wishlist:userWishlists.wishlist})
})

module.exports ={
    addToWishlist ,
    removeFromWishlist ,
    getUserWishlist
}
const cartModel = require("../models/cart");
const productModel = require("../models/product");
const AppError = require("../utils/appErrors");
const asyncHandler = require("../utils/asyncHandler");
function calc(cart){
    totalPrice =0
    cart.cartItems.map(ele=>{
        totalPrice +=ele.quantity*ele.price
    })
    cart.totalPrice = totalPrice
}

const addToCart =asyncHandler(async (req,res,next) => {
    const product =await productModel.findById(req.body.product)
    if(!product) return next(new AppError("product Not Found",403))
    req.body.price =product.price
    const cart =await cartModel.findOne({user:req.user._id})
    if(!cart){
        const newCart =new cartModel({
            user:req.user._id ,
            cartItems:[req.body] ,
            price:req.body.price
        })
        await newCart.save()
        res.json({message:"success",newCart})
    }
    const exist =cart.cartItems.find((ele)=>ele.product==req.body.product)
    if(exist){
        exist.quantity+=1
    }else {
        cart.cartItems.push(req.body)
    }
    calc(cart)
    await cart.save()
    res.json({message:"success",cart})
})


const updateQuantity =asyncHandler(async (req,res,next)=>{
    const product =await productModel.findById(req.params.product)
    if(!product) return next(new AppError("product Not Found",403))
    const cart =await cartModel.findOne({user:req.user._id})
    const item =cart.cartItems.find((ele)=>ele.product==req.params.product)
    if(item){
        item.quantity =req.body.quantity
    }
    calc(cart)
    await cart.save()
    res.json({message:"success",cart})
})

const removeProductFromCart=asyncHandler(async (req,res,next)=>{
    const cart =await cartModel.findOneAndUpdate({user:req.user._id},{ $pull: { cartItems: { product: req.params.product } } }, { new: true })
    !cart && next(new AppError("product Not Found or Not Found Cart",403))
    calc(cart)
    await cart.save()
    res.json({message:"success",cart})
})

const getuserCart =asyncHandler(async(req,res,next)=>{
    const cart =await cartModel.findOne({user:req.user._id})
    !cart && next(new AppError("Not Have Account" ,403))
    cart && res.json({message:"success",cart})
})
module.exports={
    addToCart ,
    updateQuantity ,
    removeProductFromCart ,
    getuserCart
}
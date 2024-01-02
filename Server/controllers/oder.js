const cartModel = require("../models/cart");
const orderModel = require("../models/order");
const productModel = require("../models/product");
const AppError = require("../utils/appErrors");
const asyncHandler = require("../utils/asyncHandler");


const createOrder=asyncHandler(async (req,res,next)=>{
    const cart =await cartModel.findOne({user:req.user._id})
    !cart && next(new AppError("You Do not Have cart"))
    totalPriceOfOrder =cart.totalPrice 
    const order =new orderModel({
        user:req.user._id ,
        cartItems:cart.cartItems ,
        shippingAdress:req.body.shippingAdress
    })
    await order.save()
    if(order){
        let options=cart.cartItems.map(element=>({
            updateOne:{
                filter:{_id:element.product},
                update:{$inc:{quantity:-element.quantity,sold:element.quantity}}
            }
        }))
        await productModel.bulkWrite(options)
        await cartModel.findByIdAndDelete(cart._id)
    }
    res.json({message:"success",order})
})

const getUserOrder =asyncHandler(async (req,res,next)=>{
    const order =await orderModel.find({user:req.user._id})
    !order && next(new AppError("Not Found Order"))
    order && res.json({message:"success",order})
})

const getAllOrder =asyncHandler(async (req,res,next)=>{
    const orders =await orderModel.find({})
    res.json({message:'success',orders})
})



module.exports ={
    createOrder ,
    getUserOrder ,
    getAllOrder
}
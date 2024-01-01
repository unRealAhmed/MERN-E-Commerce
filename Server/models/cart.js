const mongoose =require('mongoose')

const cartSchema =mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:'User'
    } ,
    cartItems:[
        {
            product:{type:mongoose.Types.ObjectId,ref:'Product'} ,
            quantity:{type:Number,default:1} ,
            price:Number
        }
    ],
    totalPrice:Number 
},{timestamps:true}, { strictPopulate: false })

const cartModel=mongoose.model('cart',cartSchema)
module.exports =cartModel
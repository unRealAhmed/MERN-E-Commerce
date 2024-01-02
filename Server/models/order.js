const mongoose =require('mongoose')

const orderSchema =mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId ,
        ref:'User'
    } ,
    cartItems:[
        {
            product:{type:mongoose.Types.ObjectId ,ref:'product'},
            quantity:Number ,
            price:Number
        } 
    ] ,
    totalPriceOfOrder:Number ,
    shippingAdress:{
        street:String ,
        city:String ,
        phone:Number
    } ,
    isPiad:{
        type:Boolean ,
        default:false
    } ,
    piadAt:Date ,
    isDilevered:{
        type:Boolean ,
        default:false
    } ,
    DileveredAt:Date ,
    paymentmethod:{
        type:String ,
        enum:['cash','card'] ,
        default:'cash'
    }
})

const orderModel =mongoose.model('order',orderSchema)

module.exports =orderModel
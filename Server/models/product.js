const mongoose =require('mongoose')

const productSchema= mongoose.Schema({
    name:{
        type:String ,
        trim:true ,
        unique:[true ,"The Name had Written Before"] ,
        required:true
    },
    descriptions:{
        type:String ,
        minlength:[3,"the discription is Too Short"] ,
        maxlength:[100,"the discription is Too long"] ,
        required:true
    },
    slug:{
        type :String ,
        required:true
    } ,
    quantity:{
        type :Number ,
        default:1
    },
    slod:{
        type :Number ,
        default:0
    },
    price:{
        type:Number ,
        required:true
    } ,
    priceAfterDiscount:{
        type:Number 
    } ,
    imgCover:String ,
    images:[{
        type:String
    }] ,
    rating:Number ,
    ratingAvg:Number ,
    userId:{
        type:mongoose.Types.ObjectId ,
        ref:"user"
    } ,
    categoryId:{
        type:mongoose.Types.ObjectId ,
        ref:"category"
    } ,
    brandId:{
        type:mongoose.Types.ObjectId ,
        ref:"brand"
    } 


},{timestamps:true})

productSchema.post('init',(ele)=>{
    ele.imgCover='http://localhost:3000/'+'product/'+ele.imgCover
    ele.images=ele.images.map((ele)=>'http://localhost:3000/'+'product/'+ele)

})
const productModel= mongoose.model('product',productSchema)

module.exports =productModel
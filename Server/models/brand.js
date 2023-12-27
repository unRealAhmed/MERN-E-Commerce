const mongoose=require('mongoose')

const brandSchema=mongoose.Schema({
    name:{
        type:String ,
        trim:true ,
        unique:[true ,"The Name had Written Before"] ,
        required:true
    },
    slug:String ,
    logo:String ,
    userId:{
        type:mongoose.Types.ObjectId ,
        ref:'user'
    }
},{timestamps:true})

brandSchema.post('init',(ele)=>{
    ele.logo='http://localhost:3000/'+'brand/'+ele.logo
})
const brandModel=mongoose.model('brand',brandSchema)
module.exports =brandModel
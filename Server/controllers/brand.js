const { default: slugify } = require("slugify")
const asyncHandler = require("../utils/asyncHandler")
const AppError = require("../utils/appErrors")
const brandModel = require("../models/brand")

const addbrand= asyncHandler(async (req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    req.body.logo=req.file.filename
 
    const brand =new brandModel(req.body)
    await brand.save()
    res.json({message:"success",brand})
})

const getAllbrands =asyncHandler(async (req,res,next)=>{
    const brands =await brandModel.find({})
    res.json({message:"success",brands})
})

const spacificbrand=asyncHandler(async (req,res,next)=>{
    const {id} =req.params 
    const brand =await brandModel.findById(id)
    !brand && next(new AppError("brand Not Found", 403)) 
    brand && res.json({message:"success",brand})
})
const updatebrand=asyncHandler(async (req,res,next)=>{
    const {id} =req.params 
    if(req.body.name){
        req.body.slug=slugify(req.body.name)
    }
    const brand =await brandModel.findByIdAndUpdate(id,req.body,{new:true})
    !brand && next(new AppError("brand Not Found", 403)) 
    brand && res.json({message:"success",brand})
})
const deletebrand=asyncHandler(async (req,res,next)=>{
    const {id} =req.params 
    const brand =await brandModel.findByIdAndDelete(id)
    !brand && next(new AppError("brand Not Found", 403)) 
    brand && res.json({message:"success",brand})
})

module.exports ={
    addbrand ,
    getAllbrands ,
    spacificbrand ,
    updatebrand ,
    deletebrand
}
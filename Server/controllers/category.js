const { default: slugify } = require("slugify")
const categoryModel = require("../models/category")
const AppError = require("../utils/appErrors")
const asyncHandler = require("../utils/asyncHandler")

const addcategory= asyncHandler(async (req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    req.body.img=req.file.filename
 
    const category =new categoryModel(req.body)
    await category.save()
    res.json({message:"success",category})
})

const getAllcategorys =asyncHandler(async (req,res,next)=>{
    const categorys =await categoryModel.find({})
    res.json({message:"success",categorys})
})

const spacificcategory=asyncHandler(async (req,res,next)=>{
    const {id} =req.params 
    const category =await categoryModel.findById(id)
    !category && next(new AppError("category Not Found", 403)) 
    category && res.json({message:"success",category})
})
const updatecategory=asyncHandler(async (req,res,next)=>{
    const {id} =req.params 
    if(req.body.name){
        req.body.slug=slugify(req.body.name)
    }
    const category =await categoryModel.findByIdAndUpdate(id,req.body,{new:true})
    !category && next(new AppError("category Not Found", 403)) 
    category && res.json({message:"success",category})
})
const deletecategory=asyncHandler(async (req,res,next)=>{
    const {id} =req.params 
    const category =await categoryModel.findByIdAndDelete(id)
    !category && next(new AppError("category Not Found", 403)) 
    category && res.json({message:"success",category})
})

module.exports ={
    addcategory ,
    getAllcategorys ,
    spacificcategory ,
    updatecategory ,
    deletecategory
}
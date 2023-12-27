const express =require('express')
const { fileUploadsingle } = require('../../middleware/fileUpload')
const { addcategory, getAllcategorys, spacificcategory, updatecategory, deletecategory } = require('../../controllers/category')

const categoryRouter =express.Router()

categoryRouter.post('/',fileUploadsingle('image','category'),addcategory)
categoryRouter.get('/',getAllcategorys)
categoryRouter.get('/:id',spacificcategory)
categoryRouter.put('/:id',updatecategory)
categoryRouter.delete('/:id',deletecategory)

module.exports=categoryRouter
const express =require('express')
const { addProduct, getAllProducts, spacificProduct, deleteProduct, updateProduct } = require('../../controllers/product')
const { fileUploadMix } = require('../../middleware/fileUpload')
const { protect } = require('../../controllers/auth')



const productRouter =express.Router()
let arrayOFMix=[{ name: 'imgcover', maxCount: 1 }, { name: 'images', maxCount: 8 }]
productRouter.post('/',protect,fileUploadMix(arrayOFMix,'product'),addProduct)
productRouter.get('/',getAllProducts)
productRouter.get('/:id',spacificProduct)
productRouter.delete('/:id',deleteProduct)
productRouter.put('/:id',updateProduct)


module.exports= productRouter
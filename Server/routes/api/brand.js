const express =require('express')
const { fileUploadsingle } = require('../../middleware/fileUpload')
const { addbrand, getAllbrands, spacificbrand, updatebrand, deletebrand } = require('../../controllers/brand')

const brandRouter =express.Router()
brandRouter.post('/',fileUploadsingle('image','brand'),addbrand)
brandRouter.get('/',getAllbrands)
brandRouter.get('/:id',spacificbrand)
brandRouter.put('/:id',updatebrand)
brandRouter.delete('/:id',deletebrand)


module.exports =brandRouter
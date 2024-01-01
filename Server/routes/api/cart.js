const express =require('express')
const { addToCart, updateQuantity, removeProductFromCart, getuserCart } = require('../../controllers/cart')
const { protect } = require('../../controllers/auth')

const cartRouter =express.Router()
cartRouter.post('/',protect,addToCart)
cartRouter.get('/',protect,getuserCart)
cartRouter.put('/:product',protect,updateQuantity)
cartRouter.delete('/:product',protect,removeProductFromCart)


module.exports =cartRouter
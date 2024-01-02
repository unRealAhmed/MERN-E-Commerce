const express =require('express')
const { createOrder, getUserOrder, getAllOrder } = require('../../controllers/oder')
const { protect } = require('../../controllers/auth')

const orderRouter =express.Router()

orderRouter.post('/',protect,createOrder)
orderRouter.get('/',protect,getUserOrder)
orderRouter.get('/allOrders',protect,getAllOrder)

module.exports =orderRouter
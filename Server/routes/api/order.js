const express = require('express');
const { createOrder, getUserOrder, getAllOrder } = require('../../controllers/oder');
const { protect } = require('../../controllers/auth');

const orderRouter = express.Router();

orderRouter.use(protect);

orderRouter.post('/', createOrder);
orderRouter.get('/', getUserOrder);
orderRouter.get('/allOrders', getAllOrder);

module.exports = orderRouter;

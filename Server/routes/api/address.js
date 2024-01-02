const express = require('express');
const {
  createAddress,
  getAllAddresses,
  getSingleAddress,
  updateAddress,
  deleteAddress
} = require('../../controllers/address');
const { protect } = require('../../controllers/auth');

const addressRouter = express.Router();

addressRouter.use(protect);

addressRouter.route('/')
  .post(createAddress)
  .get(getAllAddresses);

addressRouter.route('/:id')
  .get(getSingleAddress)
  .patch(updateAddress)
  .delete(deleteAddress);

module.exports = addressRouter;

const express = require('express');
const {
  createAddress,
  getAllAddresses,
  getSingleAddress,
  updateAddress,
  deleteAddress } = require('../../controllers/address');
const { protect } = require('../../controllers/auth');

const router = express.Router();

router.use(protect)

router.route('/')
  .post(createAddress)
  .get(getAllAddresses);

router.route('/:id')
  .get(getSingleAddress)
  .patch(updateAddress)
  .delete(deleteAddress);

module.exports = router;

const express = require('express');
const { fileUploadsingle } = require('../../middleware/fileUpload');
const {
  addBrand,
  getAllBrands,
  specificBrand,
  updateBrand,
  deleteBrand
} = require('../../controllers/brand');
const validate = require('../../middleware/validation');
const brandSchema = require('../../validation/brandValidation');
const { protect, restrictTo } = require('../../controllers/auth');

const brandRouter = express.Router();

brandRouter.post(
  '/',
  protect,
  restrictTo('admin', 'merchant'),
  validate(brandSchema),
  fileUploadsingle('image', 'brand'),
  addBrand
);

brandRouter.get('/', getAllBrands);
brandRouter.get('/:id', specificBrand);
brandRouter.put('/:id', protect, restrictTo('admin', 'merchant'), updateBrand);
brandRouter.delete('/:id', protect, restrictTo('admin', 'merchant'), deleteBrand);

module.exports = brandRouter;

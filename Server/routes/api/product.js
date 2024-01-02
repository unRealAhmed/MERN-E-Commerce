const express = require('express');
const {
  addProduct,
  getAllProducts,
  spacificProduct,
  deleteProduct,
  updateProduct
} = require('../../controllers/product');

const { protect, restrictTo } = require('../../controllers/auth');
const { fileUploadMix } = require('../../middleware/fileUpload');
const validation = require('../../middleware/validation');
const productSchema = require('../../validation/productValidation');

const productRouter = express.Router();

const arrayOFMix = [
  { name: 'imgcover', maxCount: 1 },
  { name: 'images', maxCount: 8 }
];

productRouter.post(
  '/',
  validation(productSchema),
  fileUploadMix(arrayOFMix, 'product'),
  addProduct
);

productRouter.get('/', getAllProducts);
productRouter.get('/:id', spacificProduct);

productRouter.put('/:id', protect, restrictTo('admin', 'merchant'), updateProduct);
productRouter.delete('/:id', protect, restrictTo('admin', 'merchant'), deleteProduct);

module.exports = productRouter;

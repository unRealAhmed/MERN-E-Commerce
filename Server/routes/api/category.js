const express = require('express');
const { fileUploadsingle } = require('../../middleware/fileUpload');
const validate = require('../../middleware/validation');
const categorySchema = require('../../validation/categoryValidation');
const { protect, restrictTo } = require('../../controllers/auth');
const {
  addCategory,
  getAllCategories,
  specificCategory,
  updateCategory,
  deleteCategory
} = require('../../controllers/category');

const categoryRouter = express.Router();

categoryRouter.post(
  '/',
  protect,
  restrictTo('admin'),
  fileUploadsingle('image', 'category'),
  validate(categorySchema),
  addCategory
);

categoryRouter.get('/', getAllCategories);
categoryRouter.get('/:id', specificCategory);
categoryRouter.put('/:id', protect, restrictTo('admin'), updateCategory);
categoryRouter.delete('/:id', protect, restrictTo('admin'), deleteCategory);

module.exports = categoryRouter;

const { default: slugify } = require("slugify");
const categoryModel = require("../models/Category");
const AppError = require("../utils/appErrors");
const asyncHandler = require("../utils/asyncHandler");
const APIFeatures = require("../utils/apiFeatures");

const getAllCategories = asyncHandler(async (req, res, next) => {
    const apiFeatures = new APIFeatures(categoryModel.find({}), req.query)
        .filter()
        .sort()
        .paginate()
        .search()
        .selectFields();

    const categories = await apiFeatures.query;

    res.json({ message: 'success', categories });
});

const addCategory = asyncHandler(async (req, res, next) => {
    req.body.slug = slugify(req.body.name);

    const category = new categoryModel(req.body);
    await category.save();
    res.json({ success: true, category });
});


const specificCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const category = await categoryModel.findById(id);

    if (!category) {
        return next(new AppError(`Category with ID ${id} not found`, 404));
    }

    res.json({ success: true, category });
});

const updateCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    if (req.body.name) {
        req.body.slug = slugify(req.body.name);
    }

    const category = await categoryModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!category) {
        return next(new AppError(`Category with ID ${id} not found`, 404));
    }

    res.json({ success: true, category });
});

const deleteCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);

    if (!category) {
        return next(new AppError(`Category with ID ${id} not found`, 404));
    }

    res.json({ success: true, category });
});

module.exports = {
    addCategory,
    getAllCategories,
    specificCategory,
    updateCategory,
    deleteCategory
};
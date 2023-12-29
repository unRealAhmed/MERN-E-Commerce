const { default: slugify } = require("slugify");
const categoryModel = require("../models/Category");
const AppError = require("../utils/appErrors");
const asyncHandler = require("../utils/asyncHandler");
const APIFeatures = require("../utils/apiFeatures");

const addcategory = asyncHandler(async (req, res, next) => {
    req.body.slug = slugify(req.body.name);
    req.body.img = req.file.filename;

    const category = new categoryModel(req.body);
    await category.save();
    res.json({ message: "success", category });
});

const getAllcategorys = asyncHandler(async (req, res, next) => {
    const apiFeatures = new APIFeatures(categoryModel.find({}), req.query)
        .filter()
        .sort()
        .paginate()
        .search()
        .selectFields();

    const categories = await apiFeatures.query;

    res.json({ message: 'success', categories });
});

const spacificcategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const category = await categoryModel.findById(id);
    !category && next(new AppError("Category Not Found", 403));
    category && res.json({ message: "success", category });
});

const updatecategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (req.body.name) {
        req.body.slug = slugify(req.body.name);
    }
    const category = await categoryModel.findByIdAndUpdate(id, req.body, { new: true });
    !category && next(new AppError("Category Not Found", 403));
    category && res.json({ message: "success", category });
});

const deletecategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);
    !category && next(new AppError("Category Not Found", 403));
    category && res.json({ message: "success", category });
});

module.exports = {
    addcategory,
    getAllcategorys,
    spacificcategory,
    updatecategory,
    deletecategory
};

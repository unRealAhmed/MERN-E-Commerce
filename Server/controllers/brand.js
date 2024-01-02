const { default: slugify } = require("slugify");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appErrors");
const brandModel = require("../models/Brand");
const APIFeatures = require("../utils/apiFeatures");

const getAllBrands = asyncHandler(async (req, res, next) => {
    const apiFeatures = new APIFeatures(brandModel.find({}), req.query)
        .filter()
        .sort()
        .paginate()
        .search()
        .selectFields();

    const brands = await apiFeatures.query;

    res.json({ message: 'success', brands });
});

const addBrand = asyncHandler(async (req, res, next) => {
    req.body.slug = slugify(req.body.name);
    req.body.logo = req.file.filename;

    const brand = new brandModel(req.body);
    await brand.save();
    res.json({ success: true, brand });
});

const specificBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const brand = await brandModel.findById(id);

    if (!brand) {
        return next(new AppError(`Brand with ID ${id} not found`, 404));
    }

    res.json({ success: true, brand });
});

const updateBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    if (req.body.name) {
        req.body.slug = slugify(req.body.name);
    }

    const brand = await brandModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!brand) {
        return next(new AppError(`Brand with ID ${id} not found`, 404));
    }

    res.json({ success: true, brand });
});

const deleteBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const brand = await brandModel.findByIdAndDelete(id);

    if (!brand) {
        return next(new AppError(`Brand with ID ${id} not found`, 404));
    }

    res.json({ success: true, brand });
});

module.exports = {
    addBrand,
    getAllBrands,
    specificBrand,
    updateBrand,
    deleteBrand
};
const { default: slugify } = require("slugify");
const productModel = require("../models/product");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appErrors");
const APIFeatures = require("../utils/apiFeatures");


const getAllProducts = asyncHandler(async (req, res, next) => {
    const apiFeatures = new APIFeatures(productModel.find({}), req.query)
        .filter()
        .sort()
        .paginate()
        .search()
        .selectFields();

    const products = await apiFeatures.query;

    res.json({ message: 'success', products });
});

const addProduct = asyncHandler(async (req, res, next) => {
    req.body.userId = req.user._id;
    req.body.slug = slugify(req.body.name);

    if (req.files && req.files.imgcover && req.files.images) {
        req.body.imgCover = req.files.imgcover[0].filename;
        req.body.images = req.files.images.map((ele) => ele.filename);
    }

    const product = new productModel(req.body);
    await product.save();

    res.json({ success: true, product });
});

const spacificProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const product = await productModel.findById(id);

    if (!product) {
        return next(new AppError(`Product with ID ${id} not found`, 404));
    }

    res.json({ success: true, product });
});

const updateProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    if (req.body.name) {
        req.body.slug = slugify(req.body.name);
    }

    const product = await productModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!product) {
        return next(new AppError(`Product with ID ${id} not found`, 404));
    }

    res.json({ success: true, product });
});

const deleteProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const product = await productModel.findByIdAndDelete(id);

    if (!product) {
        return next(new AppError(`Product with ID ${id} not found`, 404));
    }

    res.json({ success: true, product });
});

module.exports = {
    addProduct,
    getAllProducts,
    spacificProduct,
    updateProduct,
    deleteProduct
};

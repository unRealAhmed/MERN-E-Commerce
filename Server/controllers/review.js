const Review = require('../models/Review');
const Product = require('../models/product');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/appErrors');
const APIFeatures = require('../utils/apiFeatures');

exports.createReview = asyncHandler(async (req, res, next) => {
  const productId = req.body.product;
  const { user } = req;

  if (!req.body.product) {
    return next(new AppError('Product ID is required for creating a review.', 400));
  }

  const productFound = await Product.findById(productId);
  if (!productFound) {
    return next(new AppError('Product Not Found', 404));
  }

  const existingReview = await Review.findOne({ product: productId, user: user._id });

  if (existingReview) {
    throw new AppError('You have already reviewed this product.', 400);
  }

  const newReview = await Review.create({
    ...req.body,
    user: user._id,
    product: productId,
  });

  res.status(201).json({
    success: true,
    message: `Your review has been added successfully and will appear when approved!`,
    data: {
      review: newReview,
    },
  });
});

exports.getAllReviews = asyncHandler(async (req, res, next) => {
  const apiFeatures = new APIFeatures(Review.find(), req.query)
    .paginate();

  const reviews = await apiFeatures.query;

  const count = await Review.countDocuments();

  res.status(200).json({
    success: true,
    reviews,
    totalPages: Math.ceil(count / apiFeatures.queryString.limit),
    currentPage: Number(apiFeatures.queryString.page),
    count,
  });
});

exports.getSingleReview = asyncHandler(async (req, res, next) => {
  const reviewId = req.params.id;

  const review = await Review.findById(reviewId);

  if (!review) {
    return next(new AppError(`Review with ID ${reviewId} not found`, 404));
  }

  res.status(200).json({
    success: true,
    data: {
      review,
    },
  });
});

exports.updateReview = asyncHandler(async (req, res, next) => {
  const reviewId = req.params.id;
  const { review, rating } = req.body;

  const updatedReview = await Review.findByIdAndUpdate(
    reviewId,
    { review, rating },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedReview) {
    return next(new AppError(`Review with ID ${reviewId} not found`, 404));
  }

  res.status(200).json({
    success: true,
    data: {
      review: updatedReview,
    },
  });
});

exports.deleteReview = asyncHandler(async (req, res, next) => {
  const reviewId = req.params.id;

  const deletedReview = await Review.findByIdAndDelete(reviewId);

  if (!deletedReview) {
    return next(new AppError(`Review with ID ${reviewId} not found`, 404));
  }

  res.status(204).json({
    success: true,
    data: null,
  });
});

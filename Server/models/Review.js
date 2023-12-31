const mongoose = require('mongoose');
const Product = require('./product');

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
    },
    review: {
      type: String,
    },
    rating: {
      type: Number,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index({ product: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'fullname',
  }).select('-updatedAt');
  next();
});

reviewSchema.statics.calcAverageRatings = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: '$product',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  const updateFields = {
    numOfReviews: stats.length > 0 ? stats[0].nRating : 0,
    averageRating: stats.length > 0 ? stats[0].avgRating : 0,
  };

  await Product.findByIdAndUpdate(productId, updateFields);
};

reviewSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.product);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.originalReview = await this.model.findOne(this.getQuery());
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  await this.originalReview.constructor.calcAverageRatings(this.originalReview.product);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

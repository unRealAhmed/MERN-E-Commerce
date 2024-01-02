const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            default: 1,
        },
        sold: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            required: true,
        },
        priceAfterDiscount: {
            type: Number,
        },
        imgCover: String,
        images: [
            {
                type: String,
            },
        ],
        averageRating: {
            type: Number,
            default: 0,
            set: (val) => +val.toFixed(1),
        },
        numOfReviews: {
            type: Number,
            default: 0,
        },
        merchant: {
            type: mongoose.Types.ObjectId,
            ref: 'Merchant',
        },
        categoryId: {
            type: mongoose.Types.ObjectId,
            ref: 'category',
        },
        brandId: {
            type: mongoose.Types.ObjectId,
            ref: 'brand',
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

productSchema.post('init', (ele) => {
    ele.imgCover = 'http://localhost:3000/' + 'product/' + ele.imgCover;
    ele.images = ele.images.map((ele) => 'http://localhost:3000/' + 'product/' + ele);
});

productSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'product',
    localField: '_id',
});

productSchema.pre(/^findOne/, function (next) {
    this.populate({
        path: 'user',
        select: 'fullname',
    }).populate({
        path: 'reviews',
        select: 'review rating',
    });
    next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

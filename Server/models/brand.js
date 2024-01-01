const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: [true, "The Name had Written Before"],
        required: true
    },
    slug: String,
    logo: String,
    merchant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Merchant'
    }
}, { timestamps: true });

brandSchema.post('init', function (doc) {
    doc.logo = 'http://localhost:3000/' + 'brand/' + doc.logo;
});

const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand;

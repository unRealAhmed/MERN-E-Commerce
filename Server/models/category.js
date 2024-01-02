const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: [true, 'The Name had Written Before'],
        required: true,
    },
    slug: String,
    img: String,
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    },
});

categorySchema.post('init', (ele) => {
    ele.img = 'http://localhost:3000/' + 'category/' + ele.img;
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

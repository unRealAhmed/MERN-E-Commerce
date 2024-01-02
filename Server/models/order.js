const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        cartItems: [
            {
                product: { type: mongoose.Types.ObjectId, ref: 'Product' },
                quantity: Number,
                price: Number,
            },
        ],
        totalPriceOfOrder: Number,
        shippingAddress: {
            street: String,
            city: String,
            phone: Number,
        },
        isPaid: {
            type: Boolean,
            default: false,
        },
        paidAt: Date,
        isDelivered: {
            type: Boolean,
            default: false,
        },
        deliveredAt: Date,
        paymentMethod: {
            type: String,
            enum: ['cash', 'card'],
            default: 'cash',
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

const mongoose = require("mongoose");

const Cart = mongoose.model(
    "cart",
    new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            unique: true,
            required: true
        },
        product: [{
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
                required: true,
                unique: true
            },
            quanty: {
                type: Number
            },
            created: { type: Date, default: Date.now },
            updated: { type: Date, default: null }
        }],
        created: { type: Date, default: Date.now },
        updated: { type: Date, default: null },
    })
);

Cart.schema.virtual('url').get(function() {
    return '/carts/'
})

module.exports = Cart;
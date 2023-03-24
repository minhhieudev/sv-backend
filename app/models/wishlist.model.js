const mongoose = require("mongoose");

const Wishlist = mongoose.model(
    "wishlist",
    new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product',
            required: true,
        },
        created: { type: Date, default: Date.now },
        updated: { type: Date, default: null },
    })
);

module.exports = Wishlist;
const mongoose = require("mongoose");

const CheckoutSchema = mongoose.model(
    "checkout",
    new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        shipping: {
            name: {
                type: String,
                required: true
            },
            phone: {
                type: String,
                required: true
            },
            email: {
                type: String,
                default: null
            },
            address: {
                type: String,
                default: null
            }
        },
        payment: {
            method: {
                type: String,
                required: true
            },
            transaction: {
                type: String,
                defaul: null
            }
        },
        product: { type: Array },
        total: { type: Number },
        status: { type: String, default: 'hold' },
        created: { type: Date, default: Date.now },
        updated: { type: Date, default: null },
    })
);

module.exports = CheckoutSchema;
const mongoose = require("mongoose");

const Supplier = mongoose.model(
    "supplier",
    new mongoose.Schema({
        title: { type: String, required: true, unique: true },
        address: { type: String, default: null },
        phone: { type: String, default: null },
        sale: { type: String, default: null },
        status: { type: Boolean, default: 1 },
        created: { type: Date, default: Date.now },
        updated: { type: Date, default: null },
    })
);

module.exports = Supplier;
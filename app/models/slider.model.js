const mongoose = require("mongoose");

const Slider = mongoose.model(
    "slider",
    new mongoose.Schema({
        title: {
            type: String,
            required: true,
            unique: true
        },
        url: {
            type: String,
            required: true
        },
        image: { type: String, required: true, },
        status: { type: Boolean, default: 1 },
        created: { type: Date, default: Date.now },
        updated: { type: Date, default: null },
    })
);

module.exports = Slider;
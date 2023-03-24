const mongoose = require("mongoose");

const Category = mongoose.model(
    "category",
    new mongoose.Schema({
        title: {
            type: String,
            required: true,
            unique: true
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        content: { type: String, default: null },
        image: { type: String, default: null },
        seo_title: { type: String, default: null },
        seo_description: { type: String, default: null },
        status: { type: Boolean, default: 1 },
        created: { type: Date, default: Date.now },
        updated: { type: Date, default: null },
    })
);

module.exports = Category;
const mongoose = require("mongoose");

const Catalog = mongoose.model(
    "catalog",
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
        parent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'catalog',
            default: null,
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

module.exports = Catalog;
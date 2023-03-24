const mongoose = require("mongoose");

const schemaMetaAttribute = new mongoose.Schema({
    meta_code: { type: String, required: true }, // brand
    value: { type: String, required: true }, // Daftmill
    slug: { type: String, required: true }, // daftmill  => auto generate from value field
    content: { type: String, default: null },
    image: { type: String, default: null },
    seo_title: { type: String, default: null },
    seo_description: { type: String, default: null },
    status: { type: Boolean, default: true }
})

schemaMetaAttribute.set('timestamps', true);

const MetaAttributeModel = mongoose.model(
    "meta-attribute",
    schemaMetaAttribute
);

module.exports = MetaAttributeModel;

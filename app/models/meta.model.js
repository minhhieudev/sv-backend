const mongoose = require("mongoose");

const metaCodes = ['location', 'region', 'brand', 'abv', 'grape', 'capacity', 'vintage', 'old', 'rank', 'oak', 'pairing', 'smell']

let schemaConfig =  new mongoose.Schema({
  title: { type: String, required: true }, // brand
  code: { type: String, required: true, unique: true }, // brand
  slug: { type: String, required: true, unique: true }, // thuong-hieu
  is_multi_value: { type: Boolean, default: false },
  show_in_product_page: { type: Boolean, default: true }
})

schemaConfig.statics.getMetaCodes = function () {
  return metaCodes
}

const MetaSchema = mongoose.model(
    "meta",
    schemaConfig
);

module.exports = MetaSchema;
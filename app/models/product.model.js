const mongoose = require("mongoose");
//const mongoosePaginate = require('mongoose-paginate-v2');
const { convert } = require('html-to-text');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    variations: [
        {
            slug: String,
            label: String
        }
    ],
    catalogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'catalog'
    }],
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'supplier'
    },
    content: {
        type: String,
        default: null
    },
    sku: {
        type: String,
        required: true,
        unique: true
    },
    barcode: {
        type: String,
        unique: true,
        default: function() { return Math.floor(Math.random() * 99999999) + 10000000 }
    },
    stock: {
        type: Number,
        default: 10000
    },
    price: {
        regular: {
            type: Number,
            required: true
        },
        sale: {
            type: Number,
            default: null
        },
        cost: {
            type: Number,
            default: null
        },
        agent: {
            type: Number,
            default: null
        }
    },
    image: {
        type: String
    },
    sliders: [{
        type: String
    }],
    status: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    seo_title: { type: String, default: null },
    seo_description: { type: String, default: null },
    
    meta_location: { type: mongoose.Schema.Types.ObjectId, ref: 'meta-attribute' },
    meta_region: { type: mongoose.Schema.Types.ObjectId, ref: 'meta-attribute' },
    meta_brand: { type: mongoose.Schema.Types.ObjectId, ref: 'meta-attribute' },
    meta_abv: { type: mongoose.Schema.Types.ObjectId, ref: 'meta-attribute' },
    meta_capacity: { type: mongoose.Schema.Types.ObjectId, ref: 'meta-attribute' },
    meta_old: { type: mongoose.Schema.Types.ObjectId, ref: 'meta-attribute' },
    meta_rank: { type: mongoose.Schema.Types.ObjectId, ref: 'meta-attribute' },
    meta_oak: { type: mongoose.Schema.Types.ObjectId, ref: 'meta-attribute' },

    meta_paring: [{ type: mongoose.Schema.Types.ObjectId, ref: 'meta-attribute' }],
    meta_smell: [{ type: mongoose.Schema.Types.ObjectId, ref: 'meta-attribute' }],
    meta_grape: [{ type: mongoose.Schema.Types.ObjectId, ref: 'meta-attribute' }],
    meta_vintage: [{ type: mongoose.Schema.Types.ObjectId, ref: 'meta-attribute' }],
});

productSchema.set('timestamps', true);

productSchema.post('findOne', function (product) {
    if (product && !product.seo_description) {
        let text = convert(product.content, {
            wordwrap: false,
            ignoreHref: true,
            ignoreImage: true
        });
        
        let words = text.split(' ')
        words = words.splice(0, 30)
        product.seo_description = words.join(' ')
    }

    return product
})

//productSchema.plugin(mongoosePaginate);

const Product = mongoose.model('product', productSchema);
//Product.paginate().then({}); // Usage
module.exports = Product;
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.admin = require("./admin.model");
db.user = require("./user.model");
db.product = require("./product.model");
db.category = require("./category.model");
db.post = require("./post.model");
db.slider = require("./slider.model");
db.cart = require("./cart.model");
db.wishlist = require("./wishlist.model");
db.comment = require("./comment.model");
db.supplier = require("./supplier.model");
db.catalog = require('./catalog.model')
db.checkout = require("./checkout.model");
db.meta = require('./meta.model');
db['meta-attribute'] = require("./meta-attribute.model");
db.file = require('./file.model');
db.order = require('./order.model');

module.exports = db;
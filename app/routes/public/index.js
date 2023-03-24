var express = require('express');
const app = express();

app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});
app.use('/auth', require('./auth.routes'));
app.use('/users', require('./user.routes'));

// trang chủ
app.use('/home', require('./home.routes'));
app.use('/sliders', require('./slider.routes'));

// Bài viết
app.use('/categories', require('./category.routes'));
app.use('/posts', require('./post.routes'));

// Sản phẩm
app.use('/catalogs', require('./catalog.routes'));
app.use('/products', require('./product.routes'));

app.use('/brands', require('./brand.routes'));
app.use('/grapes', require('./grape.routes'));
app.use('/locations', require('./location.routes'));
app.use('/regions', require('./region.routes'));
app.use('/capacities', require('./capacity.routes'));
app.use('/abv', require('./abv.routes'));
app.use('/ranks', require('./rank.routes'));
app.use('/vintages', require('./vintage.routes'));
app.use('/oaks', require('./oak.routes'));
app.use('/olds', require('./old.routes'));
app.use('/smells', require('./smell.routes'));
app.use('/pairings', require('./pairing.routes'));


// Giỏ hàng, thanh toán
app.use('/carts', require('./cart.routes'));

// Wishlists
app.use('/wishlists', require('./wishlist.routes'));

// Comments
app.use('/comments', require('./comment.routes'));

// Address
app.use('/address', require('./address.routes'));


module.exports = app;
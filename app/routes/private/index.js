var express = require('express');
const authJwt = require("../../middlewares/authJwt");
const app = express();


app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});
app.use('/auth', require('./auth.routes'));
app.use('/file', require('./file.routes'));

app.use(authJwt.verifyRoleAdmin);

app.use('/users', require('./user.routes'));

// trang chủ
app.use('/home', require('./home.routes'));
app.use('/sliders', require('./slider.routes'));

// Bài viết
app.use('/categories', require('./category.routes'));
app.use('/posts', require('./post.routes'));

// Sản phẩm
app.use('/suppliers', require('./supplier.routes'));
app.use('/products', require('./product.routes'));

// Comments
app.use('/comments', require('./comment.routes'));

// Catalogs
app.use('/catalogs', require('./catalog.routes'))

// meta 
app.use('/meta', require('./meta.routes'))

// meta attribute
app.use('/meta-attribute', require('./meta-attribute.routes'))

// Order 
app.use('/order', require('./order.routes'))

// helper 
app.use('/helper', require('./helper.routes'))

app.use('/setting', require('./setting.routes'))

app.use('/report', require('./report.routes'))

module.exports = app;
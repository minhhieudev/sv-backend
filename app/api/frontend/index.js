var express = require('express');
const app = express();

app.use('/entity', require('./entity'))
app.use('/helper', require('./helper'))
app.use('/cart', require('./cart'))
app.use('/meta', require('./meta'))
app.use('/product', require('./product'))
app.use('/order', require('./order'))
app.use('/auth', require('./auth'))
app.use('/article', require('./article'))
module.exports = app;
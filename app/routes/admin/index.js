const express = require('express');
const authJwt = require("../../middlewares/authJwt");
const app = express();

app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

app.use('/auth', require('./auth'));
app.use('/file', require('./file'));

app.use(authJwt.verifyRoleAdmin);
app.use('/users', require('./user'));
app.use('/helper', require('./helper'))
app.use('/setting', require('./setting'))
app.use('/report', require('./report'))
app.use('/task', require('./task'))
app.use('/sprint', require('./sprint'))
app.use('/epic', require('./epic'))

module.exports = app;

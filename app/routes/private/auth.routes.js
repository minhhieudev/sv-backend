var express = require('express');
const app = express();
const controller = require("../../controllers/private/auth.controller");

const { validate } = require("../../validator/adminValidator");

app.post("/signin", controller.signin);
app.post("/signup", [validate.validateSignup()], controller.signup);
// app.post("/refresh", controller.refresh);

module.exports = app;
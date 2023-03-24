var express = require('express');
const app = express();
const { verifySignUp } = require("../../middlewares");
const controller = require("../../controllers/public/auth.controller");

const { validate } = require("../../validator/userValidator");

app.post("/signin", controller.signin);
app.post("/signup", [validate.validateSignup(), verifySignUp.checkDuplicateEmail], controller.signup);
// app.post("/refresh", controller.refresh);

module.exports = app;
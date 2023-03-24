var express = require('express');
const app = express();
const { check, validationResult } = require('express-validator');

const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/public/cart.controller");
const { validate } = require("../../validator/cartValidator");


app.get("/", [authJwt.verifyToken], controller.all);
app.post("/", [authJwt.verifyToken, validate.validateAdd(), validate.checkDataAdd], controller.add);
app.delete("/", [authJwt.verifyToken], controller.delete);

module.exports = app;
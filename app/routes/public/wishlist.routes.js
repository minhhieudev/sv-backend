var express = require('express');
const app = express();
const { check, validationResult } = require('express-validator');

const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/public/wishlist.controller");
const { validate } = require("../../validator/wishlistValidator");


app.get("/", controller.all);
app.post("/", [authJwt.verifyToken, validate.validateAdd(), validate.checkDataAdd], controller.add);
app.delete("/:id", [authJwt.verifyToken], controller.delete);

module.exports = app;
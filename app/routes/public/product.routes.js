var express = require('express');
const app = express();
const { check, validationResult } = require('express-validator');

const controller = require("../../controllers/public/product.controller");


app.get("/", controller.all);
app.get("/attr", controller.attr);
app.get("/:id", controller.detail);


module.exports = app;
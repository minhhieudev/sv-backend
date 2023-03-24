var express = require('express');
const app = express();
const { check, validationResult } = require('express-validator');

const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/public/abv.controller");


app.get("/", controller.all);
app.get("/:id", controller.detail);

module.exports = app;
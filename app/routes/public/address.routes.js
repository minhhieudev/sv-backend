var express = require('express');
const app = express();
const { check, validationResult } = require('express-validator');

const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/public/address.controller");


app.get("/", controller.address);


module.exports = app;
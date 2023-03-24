var express = require('express');
const app = express();
const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/public/user.controller");
const { validate } = require("../../validator/userValidator");
const { check, validationResult } = require('express-validator');


app.get("/", [authJwt.verifyToken], controller.userInfo);
app.post("/", [authJwt.verifyToken, validate.validateUpdate()], controller.updateInfo);
app.get("/orders", [authJwt.verifyToken, ], controller.historyOrder);

module.exports = app;
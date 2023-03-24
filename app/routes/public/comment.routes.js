var express = require('express');
const app = express();
const { check, validationResult } = require('express-validator');

const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/public/comment.controller");
const { validate } = require("../../validator/commentValidator");


app.post("/", [authJwt.verifyToken, validate.validateAdd()], controller.add);

module.exports = app;
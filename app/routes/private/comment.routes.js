var express = require('express');
const app = express();
const { check, validationResult } = require('express-validator');

const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/private/comment.controller");
const { validate } = require("../../validator/commentValidator");


app.get("/", controller.all);
app.post("/", [validate.validateAdd()], controller.add);
app.delete("/:id", controller.delete);

module.exports = app;
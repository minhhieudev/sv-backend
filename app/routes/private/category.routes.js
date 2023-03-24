var express = require('express');
const app = express();
const { check, validationResult } = require('express-validator');

const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/private/category.controller");
const { validate } = require("../../validator/categoryValidator");

app.post("/collection", controller.getCollection);
app.get("/", controller.all);
app.get("/:id", controller.detail);
app.post("/", [validate.validateAdd()], controller.add);
app.put("/:id", controller.edit);
app.delete("/:id", controller.delete);

module.exports = app;
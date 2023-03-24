var express = require('express');
const app = express();

const controller = require("../../controllers/private/post.controller");
const { validate } = require("../../validator/postValidator");
const { authJwt } = require("../../middlewares");

app.post("/collection", controller.getCollection);
app.get("/", controller.all);
app.get("/:id", controller.detail);
app.post("/", [validate.validateAdd(), validate.checkDataAdd, validate.checkCategories], controller.add);
app.put("/:id", [validate.validateAdd(), validate.checkDataEdit, validate.checkCategories], controller.edit);
app.delete("/:id", controller.delete);


module.exports = app;
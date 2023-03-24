var express = require('express');
const app = express();
const controller = require("../../controllers/private/product.controller");
const { validate } = require("../../validator/productValidator");

app.post("/collection", controller.getCollection);
app.get("/", controller.all);
app.get("/attr", controller.attr);
app.get("/:id", controller.detail);
app.post("/", [validate.validateAdd(), validate.checkDataAdd], controller.add);
app.put("/:id", validate.validateAdd() , controller.edit);
app.delete("/:id", controller.delete);

module.exports = app;
var express = require('express');
const app = express();
const controller = require("../../controllers/private/meta-attribute.controller");

app.post("/collection", controller.getCollection);
app.get("/", controller.all);
app.get("/:id", controller.detail);
app.post("/", controller.add);
app.put("/:id", controller.edit);
app.delete("/:id", controller.delete);

module.exports = app;
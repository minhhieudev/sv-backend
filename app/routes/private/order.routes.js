var express = require('express');
const app = express();
const controller = require("../../controllers/private/order.controller");

app.post("/collection", controller.collection);
app.get("/:id", controller.detail);
app.put("/:id", controller.edit);

module.exports = app;
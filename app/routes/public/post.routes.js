var express = require('express');
const app = express();

const controller = require("../../controllers/public/post.controller");

app.get("/", controller.all);
app.get("/:id", controller.detail);

module.exports = app;
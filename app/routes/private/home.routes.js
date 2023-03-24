var express = require('express');
const app = express();
const controller = require("../../controllers/private/home.controller");



app.get("/", controller.all);

module.exports = app;
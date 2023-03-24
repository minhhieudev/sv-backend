var express = require('express');
const app = express();
const controller = require("../../controllers/public/home.controller");



app.get("/", controller.all);

module.exports = app;
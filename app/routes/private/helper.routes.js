var express = require('express');
const app = express();
const controller = require("../../controllers/private/auth.controller");

const { validate } = require("../../validator/adminValidator");

app.get("/init", (req, res) => {
  return res.json({})
});

module.exports = app;
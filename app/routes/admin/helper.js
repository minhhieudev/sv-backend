const express = require('express');
const app = express();

app.get("/init", (req, res) => {
  return res.json({})
});

module.exports = app;
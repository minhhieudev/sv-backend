const db = {};

db.user = require("./user");
db.file = require('./file');
db.setting = require('./setting');
db.report = require('./report');

module.exports = db;
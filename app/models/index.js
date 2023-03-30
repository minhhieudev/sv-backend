const db = {};

db.user = require("./User");
db.file = require('./File');
db.setting = require('./Setting');
db.report = require('./Report');
db.epic = require('./Epic');
db.task = require('./Task');
db.sprint = require('./Sprint');

module.exports = db;
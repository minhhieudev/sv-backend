const db = {};

db.user = require("./user");
db.file = require('./file');
db.setting = require('./setting');
db.report = require('./report');
db.epic = require('./epic');
db.task = require('./task');
db.sprint = require('./sprint');
db.comment = require('./Comment');
db.taskreport = require('./TaskReport');

module.exports = db;
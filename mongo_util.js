var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost/KWChat');

module.exports = db;

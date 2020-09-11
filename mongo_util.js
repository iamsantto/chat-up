// ---------------- Singleton MongoDb Connection Set Up ---------------- >>
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost/ChatUp');

module.exports = db;

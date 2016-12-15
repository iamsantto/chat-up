// ---------------- Singleton MongoDb Connection Set Up ---------------- >>
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost/KWChat');  //db name = 'KWChat'

module.exports = db;

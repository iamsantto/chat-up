var mongo = require('mongodb');
var monk = require('monk');
var db = monk(' 192.168.1.3:9900/KWCHAT');

module.exports = db;

// ---------------- Restoring Saved Messages API ---------------- >>
var express = require('express');
var router = express.Router();
var mongo = require('../../mongo_util');
var messages = mongo.get('Messages'); //collection = 'Messages'


router.get('/messages',function(req, res) {
  var key = req.query.room;
  messages.find({'room': key}).then(function(data){
    res.send(data);
  })
})

module.exports = router;

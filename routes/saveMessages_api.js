var express = require('express');
var router = express.Router();
var mongo = require('../mongo_util');
var messages = mongo.get('Messages');

router.post('/messages',function(req, res) {
  var newMessage = req.body;
  messages.insert(newMessage).then(function(){
    res.send("Successfully saved to database!");
  })
})

module.exports = router;

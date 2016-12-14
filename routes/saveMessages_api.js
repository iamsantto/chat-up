var express = require('express');
var router = express.Router();

router.post('/messages',function(req, res) {
  res.send("Hello! Working - Post.");
})

module.exports = router;

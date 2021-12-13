var express = require('express');
var router = express.Router();
let initialized = false
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('index message from server');
});

module.exports = {router:router, initialized:initialized};

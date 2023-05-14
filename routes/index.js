var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let args = req.query;
  res.render('index', { title: 'Express', args: args });
});

module.exports = router;

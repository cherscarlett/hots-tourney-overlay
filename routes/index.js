var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Heroes of the Storm: A Tournament Overlay' });
  
});

module.exports = router;


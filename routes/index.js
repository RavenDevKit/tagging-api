var express = require('express');
var router = express.Router();
var raven = require('../lib/raven');

/* GET home page. */
router.get('/', function(req, res, next) {
  var title = 'Raven Express';
  raven.getBlockchainInfo(function(err, ret) {
    if (err) {
      res.render('raven-help', { title: title, info: 'raven is not responding' });
    } else {
      res.render('index', { title: title, info: JSON.stringify(ret.result, null, 4) });
    }
  });
});

module.exports = router;

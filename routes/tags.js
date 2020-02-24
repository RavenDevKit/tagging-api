var express = require('express');
var router = express.Router();
var raven = require('../lib/raven');
var async = require("async");

var normalize_tag_name = function(tag) {
  var normal = tag.startsWith("#") ? tag : "#" + tag;
  normal = normal.toUpperCase();
  return normal;
}

var normalize_nested_tag_name = function(tag, subtag) {
  var normal = `${normalize_tag_name(tag)}/${normalize_tag_name(subtag)}`
  return normal;
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  var tags = {};
  var addresses = {};

  // get list of tag assets
  raven.listMyAssets('#*', function(err, ret) {
    if (err) {
      res.send(err.message);
    } else {
      tags = ret.result;

      // get list of addresses for each tag
      async.each(Object.keys(tags), function(tag, callback) {
        raven.listAddressesForTag(tag, function(err, ret) {
          if (err) {
            callback(err.message);
          } else {
            addresses[tag] = ret.result;
            callback();
          }
        });        
      }, function(err) {
        if (err) {
          res.send(err);
        } else {
          res.render('tags', {
            title: 'Tag Info', 
            tags: JSON.stringify(tags, null, 4), 
            addresses: JSON.stringify(addresses, null, 4)
          });          
        }
      });
    }
  });
});

router.put('/:tag/address/:address', function(req, res, next) {
  raven.addTagToAddress(normalize_tag_name(req.params.tag), req.params.address, function(err, ret) {
    if (err) {
      res.send(400, err);
    } else {
      res.send(200)
    }
  });
});

router.put('/:tag/:subtag/address/:address', function(req, res, next) {
  raven.addTagToAddress(
    normalize_nested_tag_name(req.params.tag, req.params.subtag), 
    req.params.address, 
    function(err, ret) {
      if (err) {
        res.send(400, err);
      } else {
        res.send(200)
      }
    });
});

router.delete('/:tag/address/:address', function(req, res, next) {
  raven.removeTagFromAddress(normalize_tag_name(req.params.tag), req.params.address, function(err, ret) {
    if (err) {
      res.send(400, err);
    } else {
      res.send(200)
    }
  });
})

router.delete('/:tag/:subtag/address/:address', function(req, res, next) {
  raven.removeTagFromAddress(
    normalize_nested_tag_name(req.params.tag, req.params.subtag), 
    req.params.address, 
    function(err, ret) {
      if (err) {
        res.send(400, err);
      } else {
        res.send(200)
      }
    });
})

module.exports = router;

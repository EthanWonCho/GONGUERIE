var express = require('express');
var router = express.Router();
var db = require("../config/mysql");
var conn = db.init();
const helper = require('../helper');

router.get('/', function(req, res, next) {
  var cmd = "select * from announcements";
  conn.query(cmd, function(err, result) {
    if(result.length == 0) {
      res.redirect('/404');
    } else {
      // res.send(result);
      res.render('announcements', {res: result, helper: helper});
    }
  });
});

module.exports = router;

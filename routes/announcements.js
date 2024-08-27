var express = require('express');
var router = express.Router();
var db = require("../config/mysql");
var conn = db.init();
const helper = require('../helper');

router.get('/', function(req, res, next) {
  var cmd = "select * from announcements";
  conn.query(cmd, function(err, result) {
    if(err) {
      console.log("query error: " + err);
      res.send(NULL);
    } else {
      // res.send(result);
      result[0].written_date = helper.formatDate(result[0].written_date);
      res.render('announcements', result[0]);
    }
  });
});

module.exports = router;

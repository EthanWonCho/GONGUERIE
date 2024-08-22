var express = require('express');
var router = express.Router();
var db = require("../config/mysql");
var conn = db.init();

router.get('/', function(req, res, next) {
  // var cmd = "select * from announcements";
  // conn.query(cmd, function(err, result) {
  //   if(err) {
  //     console.log("query error: " + err);
  //     res.send(NULL);
  //   } else res.send(result);
  // })
  res.render('index');
});

module.exports = router;

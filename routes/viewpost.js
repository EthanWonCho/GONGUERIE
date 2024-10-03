var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var db = require("../config/mysql");
var conn = db.init();
const helper = require('../helper');

router.get('/', function(req, res, next) {
  if(req.query.postid) {
    var cmd = "SELECT * FROM announcements WHERE n = ?";
    conn.query(cmd, [req.query.postid], function(err, result) {
      // res.send(result);
      if(result.length == 0 || err) {
        next(createError(500));
      } else {
        result[0].written_date = helper.formatDate(result[0].written_date);
        res.render("viewpost", result[0]);
      }
    });
  } else {
    res.redirect("/announcements");
  }
});

router.delete('/', function(req, res, next) {
  if(req.query.postid) {
    var cmd = "DELETE FROM announcements WHERE n = ?";
    conn.query(cmd, [req.query.postid], function(err, result) {
      // res.send(result);
      if(result.length == 0 || err) {
        console.error('Query Error: ', err);
        next(createError(500));
      } else {
        res.status(200).send();
      }
    });
  } else {
    next(createError(400)); //malformed request syntax
  }
});

module.exports = router;
 
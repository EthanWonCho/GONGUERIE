var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var db = require("../config/mysql");
var conn = db.init();
const helper = require('../helper');

router.get('/', function(req, res, next) {
  if(req.query.postid) {
    const postid = req.query.postid;
    var cmd = "SELECT * FROM announcements WHERE n = " + postid;
    conn.query(cmd, function(err, result) {
      // res.send(result);
      if(result.length == 0) {
        next(createError(404));
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
    const postid = req.query.postid;
    var cmd = "DELETE FROM announcements WHERE n = " + postid;
    conn.query(cmd, function(err, result) {
      // res.send(result);
      if(result.length == 0) {
        console.error('Query Error: ', err);
        next(createError(503));
      } else {
        res.status(200).send();
      }
    });
  } else {
    next(createError(410));
  }
});

module.exports = router;
 
var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var db = require("../config/mysql");
var conn = db.init();
const helper = require('../helper');

router.get('/', function(req, res) {
  var cmd = "select * from announcements";
  conn.query(cmd, function(err, result) {
    if(err) {
      console.error('Query Error: ', err);
      next(createError(500));
    } else {
      res.render('index', {res: result, helper: helper});
    }
  });
});

module.exports = router;

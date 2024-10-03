var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var db = require("../config/mysql");
var conn = db.init();
const helper = require('../helper');

router.get('/', function(req, res, next) {
  res.render("writepost");
});

router.post('/', function(req, res, next) {
  var cmd = 'INSERT INTO announcements (title, author, written_date, view_count, contents) VALUES (?, ?, now(), 0, ?)';
  var params = [req.body.title, 'Unknown User', req.body.content];
  conn.query(cmd, params, function(err, result) {
    if(err) {
      console.error('Query Error: ', err);
      next(createError(503));
    } else {
      res.status(200).send({id: result.insertId});
    }
  });
});

module.exports = router;
 
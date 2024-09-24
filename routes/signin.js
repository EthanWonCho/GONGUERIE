var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var db = require("../config/mysql");
var conn = db.init();
const helper = require('../helper');

router.get('/', function(req, res) {
  res.render('signin');
});

router.post('/', function(req, res, next) {
  var cmd = 'SELECT pw from user where id = ?';
  params = [req.body.id];
  conn.query(cmd, params, function(err, result) {
    if(err) {
      console.error('Query Error: ', err);
      next(createError(400));
    } else {
      if(result[0].pw === req.body.pw) {
        req.session.user = {
          id: req.body.id,
          authorized: true,
        };
        res.status(200).send();
      } else {
        res.status(503).send();
      }
    }
  });
});

module.exports = router;

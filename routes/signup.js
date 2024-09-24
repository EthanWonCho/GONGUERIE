var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var db = require("../config/mysql");
var conn = db.init();
const helper = require('../helper');

router.get('/', function(req, res) {
  res.render('signup');
});

router.post('/', function(req, res, next) {
  var cmd = 'INSERT INTO user (id, pw) VALUES ( ? , ? );';
  params = [req.body.id, req.body.pw];
  conn.query(cmd, params, function(err, result) {
    if(err) {
      console.error('Query Error: ', err);
      next(createError(400));
    } else {
      req.session.user = {
        id: req.body.id,
        authorized: true,
      };
      res.status(200).send();
    }
  });
});

module.exports = router;

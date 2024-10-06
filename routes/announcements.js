var createError = require('http-errors');
var express = require('express');
var router = express.Router();
// var db = require("../config/mysql");
// var conn = db.init();
const helper = require('../helper');
const dbMiddleware = require('../middlewares/dbMiddleware');
router.use(dbMiddleware);

router.get('/', function(req, res, next) {
  var cmd = "select * from announcements";
  req.conn.query(cmd, function(err, result) {
    if(result.length == 0 || err) {
      next(createError(500));
    } else {
      // res.send(result);
      res.render('announcements', {res: result, helper: helper});
    }
  });
});

module.exports = router;

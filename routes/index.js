var createError = require('http-errors');
var express = require('express');
var router = express.Router();
const helper = require('../helper');
const dbMiddleware = require('../middlewares/dbMiddleware');
router.use(dbMiddleware);

router.get('/', function(req, res) {
  var cmd = "select * from announcements";
  req.conn.query(cmd, function(err, result) {
    if(err) {
      console.error('Query Error: ', err);
      next(createError(500));
    } else {
      res.render('index', {res: result, helper: helper});
    }
  });
});

module.exports = router;

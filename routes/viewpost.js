var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var db = require("../config/mysql");
var conn = db.init();
const helper = require('../helper');
const dbMiddleware = require('../middlewares/dbMiddleware');
router.use(dbMiddleware);

router.get('/', async function(req, res, next) {
  if(req.query.postid) {
    try {
      var cmd = "SELECT * FROM announcements WHERE n = ?";
      const result = await req.conn.query(cmd, [req.query.postid]);
      result[0][0].written_date = helper.formatDate(result[0].written_date);
      res.render("viewpost", result[0][0]);
    } catch(err) {
      next(createError(500));
    }
  } else {
    res.redirect("/announcements");
  }
});

router.delete('/', async function(req, res, next) {
  if(req.query.postid) {
    try {
      var cmd = "DELETE FROM announcements WHERE n = ?";
      await req.conn.query(cmd, [req.query.postid]);
      res.status(200).send();
    } catch(err) {
      console.error('Query Error: ', err);
      next(createError(500));
    }
  } else {
    next(createError(400));  //malformed request syntax
  }
});

module.exports = router;
 
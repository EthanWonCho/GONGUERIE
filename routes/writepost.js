var createError = require('http-errors');
var express = require('express');
var router = express.Router();
const helper = require('../helper');
const dbMiddleware = require('../middlewares/dbMiddleware');
router.use(dbMiddleware);

router.get('/', function(req, res, next) {
  res.render("writepost");
});

router.post('/', function(req, res, next) {
  var cmd = 'INSERT INTO announcements (title, author, written_date, view_count, contents) VALUES (?, ?, now(), 0, ?)';
  var params = [req.body.title, 'Unknown User', req.body.content];
  req.conn.query(cmd, params, function(err, result) {
    if(err) {
      console.error('Query Error: ', err);
      next(createError(500));
    } else {
      res.status(201).send({id: result.insertId});
    }
  });
});

module.exports = router;
 
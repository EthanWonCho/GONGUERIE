var createError = require('http-errors');
var express = require('express');
var router = express.Router();
const helper = require('../helper');
const dbMiddleware = require('../middlewares/dbMiddleware');
router.use(dbMiddleware);

router.get('/', function(req, res, next) {
  res.render("writepost");
});

router.post('/', async function(req, res, next) {
  try {
    var cmd = 'INSERT INTO announcements (title, author, written_date, view_count, contents) VALUES (?, ?, now(), 0, ?)';
    await req.conn.query(cmd, [req.body.title, 'Unknown User', req.body.content]);
    res.status(201).send({id: result.insertId});
  } catch(err) {
    console.error('Query Error: ', err);
    next(createError(500));
  }
});

module.exports = router;
 
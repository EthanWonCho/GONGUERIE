var createError = require('http-errors');
var express = require('express');
var router = express.Router();
const helper = require('../helper');
const dbMiddleware = require('../middlewares/dbMiddleware');
router.use(dbMiddleware);

router.get('/', async function(req, res) {
  try {
    var cmd = "select * from announcements";
    const result = await req.conn.query(cmd);
    res.render('index', {res: result[0], helper: helper});
  } catch(err) {
    console.error('Query Error: ', err);
    next(createError(500));
  }
});

module.exports = router;

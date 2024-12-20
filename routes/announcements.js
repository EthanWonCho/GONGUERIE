var createError = require('http-errors');
var express = require('express');
var router = express.Router();
const helper = require('../helper');
const dbMiddleware = require('../middlewares/dbMiddleware');
router.use(dbMiddleware);

router.get('/', async function(req, res, next) {
  try {
    var cmd = "SELECT * FROM announcements ORDER BY n DESC LIMIT 0, 10;";
    const result = await req.conn.query(cmd);
    res.render('announcements', {res: result[0], helper: helper});
  } catch(err) {
    next(createError(500));
  }
});

module.exports = router;

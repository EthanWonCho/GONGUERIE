var createError = require('http-errors');
var express = require('express');
var router = express.Router();
const helper = require('../helper');
const bcrypt = require('bcrypt');
const dbMiddleware = require('../middlewares/dbMiddleware');
router.use(dbMiddleware);

router.get('/', function(req, res) {
  res.render('signup');
});

router.post('/', function(req, res, next) {
  bcrypt.hash(req.body.pw, 10, async function(err, hash) {
    if (err) {
      // Handle error
      console.error('Hash Error: ', err);
      next(createError(503));
      return;
    }
    // Hashing successful, 'hash' contains the hashed password
    try {
      var cmd = 'INSERT INTO user (id, pw) VALUES ( ? , ? );';
      await req.conn.query(cmd, [req.body.id, hash]);
      req.session.user = {
        id: req.body.id,
        authorized: true,
      };
      res.status(200).send();
    } catch(err) {
      console.error('Query Error: ', err);
      next(createError(500));
    }
  });
});

module.exports = router;

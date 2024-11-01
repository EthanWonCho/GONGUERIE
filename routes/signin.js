var createError = require('http-errors');
var express = require('express');
var router = express.Router();
const helper = require('../helper');
const bcrypt = require('bcrypt');
const dbMiddleware = require('../middlewares/dbMiddleware');
router.use(dbMiddleware);

router.get('/', function(req, res) {
  res.render('signin');
});

router.post('/', async function(req, res, next) {
  try {
    var cmd = 'SELECT pw from user where id = ?';
    const result = await req.conn.query(cmd, [req.body.id]);
    bcrypt.compare(req.body.pw, result[0][0].pw, (err, result) => {
      if (err) {
        // Handle error
        console.error('Error comparing passwords:', err);
        res.status(500).send();
        return;
      }
      if (result) {
        // Passwords match, authentication successful
        console.log('Passwords match! User authenticated.');
        res.status(200).send();
        req.session.user = {
          id: req.body.id,
          authorized: true,
        };
      } else {
        // Passwords don't match, authentication failed
        console.log('Passwords do not match! Authentication failed.');
        res.status(401).send();
      }
    });
  } catch(err) {
    console.error('Query Error: ', err);
    next(createError(400));
  }
});

module.exports = router;

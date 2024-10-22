var createError = require('http-errors');
var express = require('express');
var router = express.Router();
const helper = require('../helper');
const dbMiddleware = require('../middlewares/dbMiddleware');
router.use(dbMiddleware);
const chatGPTMiddleware = require('../middlewares/dbMiddleware');

router.get('/', function(req, res, next) {
  res.render("writepost");
});

router.post('/', async function(req, res, next) {
  const categorytext = await helper.callChatGPT(req.body.title+req.body.content);
  console.log(categorytext);

  var category = 0;
  if(categorytext == "국어") category = 1;
  else if(categorytext == "영어") category = 2;
  else if(categorytext == "수학") category = 3;
  else if(categorytext == "과학") category = 4;

  try {
    var cmd = 'INSERT INTO announcements (title, author, written_date, view_count, category, contents) VALUES (?, ?, now(), 0, ?, ?)';
    const result = await req.conn.query(cmd, [req.body.title, 'Unknown User', category, req.body.content]);
    res.status(201).send({id: result[0].insertId});
  } catch(err) {
    console.error('Query Error: ', err);
    next(createError(500));
  }
});

module.exports = router;
 
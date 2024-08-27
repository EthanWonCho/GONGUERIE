var express = require('express');
var router = express.Router();
var db = require("../config/mysql");
var conn = db.init();
const moment = require('moment');

router.get('/', function(req, res) {
  if(req.query.postid) {
    const postid = req.query.postid;
    var cmd = "SELECT * FROM announcements WHERE n = " + postid;
    conn.query(cmd, function(err, result) {
      // res.render('viewpost', {"hello":req.query.hello, "bye":req.query.bye});
      if(err) {
        console.log("query error: " + err);
        res.send(NULL);
      } else {
        result[0].written_date = moment(result[0].written_date).format('MMMM D YYYY');
        console.log(result[0].written_date);
        res.render("viewpost", result[0]);
      }
    });
  } else {
    res.redirect("/announcements");
  }
});

module.exports = router;

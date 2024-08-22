var mysql = require("mysql2");
const { connect } = require("../routes");
var db_info = {
  host:"localhost",
  post:"3306",
  user:"nodeapp",
  password:"laminarflow",
  database:"gonguerie",
}

module.exports = {
  init:function() {
    return mysql.createConnection(db_info);
  },
  connect:function(conn) {
    conn.connect(function(err) {
      if(err) console.error("mysql connection error: " + err);
      else console.log("mysql is connected successfully");
    });
  },
};

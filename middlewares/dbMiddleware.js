const { response } = require("../app");
const db = require("../config/mysql");
var mysql = require("mysql2/promise");

var db_info = {
  host:process.env.DB_HOST,
  post:process.env.DB_POST,
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_DATABASE,
}

module.exports = async (req, res, next) => {
  try {
    req.conn = await mysql.createConnection(db_info);
    next();
  } catch(err) {
    next(createError(500));
    // res.redirect(301, '/error?errorcode=500');
  }
};

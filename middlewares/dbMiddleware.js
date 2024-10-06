const db = require("../config/mysql");
const conn = db.init();

module.exports = (req, res, next) => {
  req.conn = conn;
  next();
};

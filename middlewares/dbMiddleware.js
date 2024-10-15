const db = require("../config/mysql");

module.exports = async (req, res, next) => {
  try{
    req.conn = await db.init();
    next();
  } catch(err) {
    next(createError(500));
  }
};

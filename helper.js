const moment = require('moment');

function formatDate(date) {
  return moment(date).format('MMMM D YYYY');
}

module.exports = { formatDate };
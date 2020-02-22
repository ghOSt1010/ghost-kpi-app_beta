const HttpErros = require('http-errors');
const logger = require('../logger/logger');

module.exports = function Error(err, req, res, next) {
   logger.error('APPICATION ERROR: ' + e, err.stack);

   if (e.status === 404) render404(err, req, res, next);

   var e = err.status || 500;

   return res
      .status(e)
      .json({
         errors: {
            message: err.message,
            error: err
         }
      })
      .render('error', {
         errors: {
            status: err,
            stack: err.stack
         }
      });
};

function render404(err, req, res, next) {
   return res.status(404).render('error', {
      message: '404',
      error: {
         status: err,
         stack: err.stack
      }
   });
}

var express = require('express');
var router = express.Router();

/**
 *    API
 */

//main API
/*
router.get('/', function(req, res, next) {
   try {
      res.json({
         info: 'GhoOSt_KPI_API_v0.0.1'
      });
   } catch (e) {
      res.json(e);
   }
});
*/
/**
 *    API info route
 */

/**
 *    Users route
 */
router.use('/users', require('./users/users'));

/**
 *    Employees Route
 */
var employees = require('./employees/employees');
router.use('/employees/', employees);

/**
 *    EmployeeSTypes Route
 */
var employeesTypes = require('./employeesTypes/employeesTypes');
router.use('/employeesTypes/', employeesTypes);

/**
 *    kpi Route
 */
var kpi = require('./kpi/kpi');
router.use('/kpi/', kpi);

/**
 *    Projects Route
 */
var projects = require('./projects/projects');
router.use('/projects/', projects);

/**
 *    Teams Route
 */
var teams = require('./teams/teams');
router.use('/teams/', teams);

/**
 *    Reports Route
 */
var reports = require('./reports/reports');
router.use('/reports/', reports);

module.exports = router;

var express = require('express');
var router = express.Router();
const employeesTypesController = require('../../../controllers/employeesTypesController');

/**
 *    Employees API
 */

//   Employees API info path
router.get('/', employeesTypesController.getAll);
router.get('/id/:id', employeesTypesController.getByID);

router.post('/', employeesTypesController.craete);

router.put('/', employeesTypesController.update);

router.delete('/:id', employeesTypesController.remove);

module.exports = router;

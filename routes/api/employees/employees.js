var express = require('express');
var router = express.Router();
const emploeesController = require('../../../controllers/employeesController');

/**
 *    Employees API
 */

//   Employees API info path
router.get('/', emploeesController.getAll);
router.get('/id/:id', emploeesController.getByID);
router.get('/name/:name', emploeesController.getByName);
router.get('/type/:type', emploeesController.getByType);
router.get('/user/:id', emploeesController.getByUserID);

router.post('/', emploeesController.create);

router.put('/', emploeesController.update);

router.delete('/:id', emploeesController.removeByID);

module.exports = router;

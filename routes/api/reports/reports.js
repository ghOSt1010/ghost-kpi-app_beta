var express = require('express');
var router = express.Router();
var reportsController = require('../../../controllers/reportsController');

/**
 *    Reports API
 */

//   Reports API info path

router.get('/', reportsController.getAll);
router.get('/id/:id', reportsController.getByID);
router.get('/kpi/:id', reportsController.getByKPIid);
router.get('/project/:id', reportsController.getByProjectId);
router.post('/', reportsController.create);
router.put('/', reportsController.update);
router.delete('/:id', reportsController.deleteByID);

module.exports = router;

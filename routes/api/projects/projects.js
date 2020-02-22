var express = require('express');
var router = express.Router();
const projectController = require('../../../controllers/projectsController');

/**
 *    Projects API
 */

//   Projects API info path
router.get('/', projectController.getAll);
router.get('/id/:id', projectController.getByID);
router.get('/name/:name', projectController.getByName);

router.post('/', projectController.create);

router.put('/', projectController.update);

router.delete('/:id', projectController.deleteByID);

module.exports = router;

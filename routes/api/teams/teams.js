var express = require('express');
var router = express.Router();
const teamsController = require('../../../controllers/teamsController');

/**
 *    Projects API
 */

//   Projects API info path
router.get('/', teamsController.getAll);
router.get('/id/:id', teamsController.getByID);
router.get('/name/:name', teamsController.getByName);

router.post('/', teamsController.create);

router.put('/', teamsController.update);

router.delete('/:id', teamsController.deleteByID);

module.exports = router;

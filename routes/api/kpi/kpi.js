var express = require('express');
var router = express.Router();
const kpisController = require('../../../controllers/kpisController');

router.get('/', kpisController.getAll);
router.get('/id/:id', kpisController.getByID);
router.get('/project/:project', kpisController.getKPIsByProjectID);

router.post('/', kpisController.create);
router.put('/', kpisController.update);

router.delete('/:id', kpisController.deleteByID);

module.exports = router;

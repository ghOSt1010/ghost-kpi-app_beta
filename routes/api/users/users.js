const router = require('express').Router();
const AuthController = require('../../../controllers/auth');
const usersController = require('../../../controllers/usersController');

//GET all users
router.get('/', usersController.getUsers);
router.delete('/:id', AuthController.verifyIfAdmin, usersController.deleteUser);

//POST new user route (optional, everyone has access)
router.post('/create', AuthController.createUser);

//POST login route (optional, everyone has access)
router.post('/login', AuthController.login);

//POST login route (optional, everyone has access)
router.put('/', usersController.updateUser);

//GET current route (required, only authenticated users have access)
router.get('/current', AuthController.verifyIfAdmin, (req, res, next) => {
   return res.status(200).send(JSON.stringify(req.decoded));
});

module.exports = router;

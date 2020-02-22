var express = require('express');
var router = express.Router();

//getting app info from package.json
const pac = require('../package.json');
const ver = pac.version;
const name = pac.name;
const auth = pac.author;
var path = require('path');

router.get('/', function(req, res, next) {
   /**
    *    TODO:
    *       -- get app data + changelog from db
    */
   res.sendFile(path.join(__dirname + '/../views/app/index.html'));
});
router.get('/login', function(req, res, next) {
   res.redirect('/Home');
});

/* GET API page. */
router.get('/api', function(req, res, next) {
   res.render('index', { title: name, version: ver, author: auth });
});

/**
 *    Default favicon.ico request handeling
 *    TODO:
 *       -- change icon from _DEFAULT REACT ICON
 */
router.get('/favicon.ico', function(req, res, next) {
   /**
    *    TODO:
    *       -- get app data + changelog from db
    */
   res.status(200).send('../public/favicon.ico');
   res.end();
});

/**
 *    Default REACT CLIENT GET REQUEST : for sock-js API
 *       -- SOCK-JS API : is not implemented
 *          -- server respond 501 = not implemented
 *          -- server respond : not implemented
 */
router.get('/sockjs-node/', function(req, res, next) {
   res.redirect('/sockjs-node/*');
   res.end();
});
router.get('/sockjs-node/*', function(req, res, next) {
   res.status(501);
   res.send('sock.js -node not implemented yet');
   res.end();
});

module.exports = router;

var express = require('express');
var router = express.Router();
const { postInscription } = require('../Controller/ControllerUser');
/* GET users listing. */
router.post('/inscription',postInscription);

module.exports = router;

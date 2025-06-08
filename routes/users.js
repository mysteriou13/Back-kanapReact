var express = require('express');
var router = express.Router();
const { postInscription,connection } = require('../Controller/ControllerUser');
/* GET users listing. */
router.post('/inscription',postInscription);

router.post("/connection",connection);

module.exports = router;

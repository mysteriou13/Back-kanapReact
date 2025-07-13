var express = require('express');
var router = express.Router();
const { postInscription,connection,readatauser,updateuser } = require('../Controller/ControllerUser');
const {decodetoken} = require('../Middleware/Middleware');
/* GET users listing. */

/*route inscrition*/
router.post('/inscription',postInscription);

/*route connection*/
router.post("/connection",connection);

/*send data user*/
router.get("/datauser",decodetoken,readatauser);

/*update data user*/
router.put("/updateuser",decodetoken,updateuser)

module.exports = router;

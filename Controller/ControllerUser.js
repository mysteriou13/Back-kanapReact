/*controllerUser*/

const { User }  = require("../Model/ModelUser");


 function postInscription(req, res) {
    console.log("inscription controller",req.body);
    
}

module.exports = { postInscription };
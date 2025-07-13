var express = require('express');
var router = express.Router();
const {InsertBasket} = require ("../Controller/ControllerPanier")

router.post("/InsertBasket",InsertBasket)

module.exports = router
var express = require('express');
var router = express.Router();

const {readProduct,readOneproduct} = require("../Controller/ControllerProduct")

router.get("/displayProduct",readProduct)
router.get("/displayOneproduct/:id",readOneproduct)

module.exports = router;
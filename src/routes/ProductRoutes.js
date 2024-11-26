const express = require('express');
const bd = require('../controllers/ProductControllers');

var router = express.Router();

router.get( '/product', bd.getCount);
router.post( '/product/create', bd.createProduct);   
router.post( '/product/count', bd.createCount);


module.exports = router;
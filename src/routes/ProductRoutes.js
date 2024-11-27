const express = require('express');
const bd = require('../controllers/ProductControllers');

var router = express.Router();

router.get( '/product', bd.getCount);
router.post( '/product/create', bd.createProduct);   
router.post( '/product/count', bd.createCount);
router.post( '/product/subtract', bd.subtractCount);
router.post( '/product/add', bd.addCount);


module.exports = router;
const express = require('express');
const bd = require('../services/ProductService');

var router = express.Router();

router.get( '/product/filter', bd.getCountFilter);
router.post( '/product/create', bd.createProduct);   
router.post( '/product/count', bd.createCount);
router.post( '/product/subtract', bd.subtractCount);
router.post( '/product/add', bd.addCount);



module.exports = router;
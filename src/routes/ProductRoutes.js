const express = require('express');
const bd = require('../services/ProductService');
const history = require('../services/HistoryActionService');

var router = express.Router();

router.get('/product/filter', bd.getCountFilter);
router.post('/product/create', bd.createProduct);   
router.post('/product/count', bd.createCount);
router.post('/product/subtract', bd.subtractCount);
router.post('/product/add', bd.addCount);
router.get('/product/history', history.getHistoryFilter);

module.exports = router;
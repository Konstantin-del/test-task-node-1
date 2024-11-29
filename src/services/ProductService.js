const pool = require('../../config/db');
const history = require('./HistoryActionService');
//let createProductD = history.createProductHistory();

 const createProduct = async(req, res) => {
    const { name, article } = req.body
    if(!req.body) res.status(400).send("Invalid client request");
    try{
      const text = 'INSERT INTO products (product_name, product_article) VALUES ($1, $2) RETURNING  product_article';
      const productId = await pool.query(text, [name, article]); 
      res.status(201).send(`product added: article: ${productId.rows[0].product_article}`);
      history.createProductHistory(article);
    }
    catch(err){
      console.log(err.message)
      res.status(507).json({"message": "error"}); 
    }
 }

 const createCount = async(req, res) => {
  let { shopId, count, productInOrder, article } = req.body;
  if(!req.body) res.status(400).send("Invalid client request");
   const text = 'INSERT INTO product_count (shop_id, product_count, product_in_order, article_product)' +
    'VALUES ($1, $2, $3, $4 ) RETURNING article_product';
  try{  
    const countProductId = await pool.query(text, [shopId, count, productInOrder, article]);
    res.status(201).send(`product added: id ${countProductId.rows[0].article_product}`);
  }
  catch(err){
    console.log(err.message)
    res.status(507).json({"message": "error"}); 
  }
}

const subtractCount = async(req, res) => {
  let { value, article } = req.body;
  if(!req.body) res.status(400).send("Invalid client request");
  const text = 'UPDATE product_in_shops SET product_count = product_count-($1)'+ 
    'WHERE article_product = ($2) RETURNING product_count';
  try{  
    const newCount = await pool.query(text, [value, article]);
    res.status(201).send(`product update: id ${newCount.rows[0].product_count}`);
  }
  catch(err){
    console.log(err.message)
    res.status(500).json({"message": "error"}); 
  }
}

const addCount = async(req, res) => {
  let { value, article  } = req.body;
  if(!req.body) res.status(400).send("Invalid client request");
  const text = 'UPDATE product_in_shops SET product_count = product_count+($1)'+ 
    'WHERE article_product = ($2) RETURNING product_count';
  try{  
    const newCount = await pool.query(text, [value, article]);
    res.status(201).send(`product update: id ${newCount.rows[0].product_count}`);
  }
  catch(err){
    console.log(err.message)
    res.status(500).json({"message": "error"}); 
  }
}

const getCountFilter = async(req, res) => { 
  if(!req.query) res.status(400).send("Invalid client request");
  const {query, value} = req.query;
  if(query == "plu") {
    try {
      const text = 'SELECT shop_id, product_count   FROM product_count WHERE article_product = ($1)';
      const result = await pool.query(text, [value]);
      res.status(200).json(result.rows); 
    } 
    catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  else if(query == "shop"){
    try {
      const text = 'SELECT article_product, product_count FROM product_count WHERE shop_id = ($1)';
      const result = await pool.query(text, [value]);
      res.status(200).json(result.rows);
    } 
    catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  else if(query == "name"){
    try {
      const text = 'SELECT article_product, product_count FROM product_count WHERE shop_id = ($1)';
      const result = await pool.query(text, [value]);
      res.status(200).json(result.rows);
    } 
    catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  else {
    res.status(400).send("Invalid client request");
  }
  };

  module.exports = {
    getCountFilter,
    createProduct,
    createCount,
    subtractCount,
    addCount,
  }
  
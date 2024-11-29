const pool = require('../../config/db');
const history = require('./HistoryActionService');

 const createProduct = async(req, res) => {
    if(Object.keys(req.body).length !== 2) {
      res.status(400).send("Invalid client request");
    }
      else{
      const { article, name } = req.body
      try{
        const text = 'INSERT INTO products (product_article, product_name) VALUES ($1, $2) RETURNING  product_article';
        const productId = await pool.query(text, [article, name]); 
        res.status(201).send(`product added: article: ${productId.rows[0].product_article}`);
      }
      catch(err){
        console.log(err.message)
        res.status(507).json({"message": "error"}); 
      }
    }
  }  
 const createCount = async(req, res) => {
  if(Object.keys(req.body).length !== 4) {
    res.status(400).send("Invalid client request");
  }
  else{
    let { article, shopId, count, productInOrder } = req.body;
    const text = 'INSERT INTO product_count (article_product, shop_id, product_count, product_in_order)' +
     'VALUES ($1, $2, $3, $4 ) RETURNING article_product';
   try{  
     const countProductId = await pool.query(text, [article, shopId, count, productInOrder]);
     res.status(201).send(`product added: id ${countProductId.rows[0].article_product}`);
     history.createCountHistory( article, shopId, count, productInOrder);
   }
   catch(err){
     console.log(err.message)
     res.status(507).json({"message": "error"}); 
   }
  }
}

const subtractCount = async(req, res) => {
  if(Object.keys(req.body).length !== 3){
    res.status(400).send("Invalid client request");
  }
  else{
    let { article, shopId, value } = req.body;
    const text = 'UPDATE product_count SET product_count = product_count-($1)'+ 
      'WHERE article_product = ($2) AND shop_id = ($3)  RETURNING product_count';
    try{  
      const item = await pool.query(text, [value, article, shopId]);
      let newCount = item.rows[0].product_count;
      res.status(201).send(`product update: new count ${newCount}`);
      history.subtractCountHistory(article, shopId, newCount)
    }
    catch(err){
      console.log(err.message)
      res.status(500).json({"message": "error"}); 
    }
  } 
}

const addCount = async(req, res) => {
  if(Object.keys(req.body).length !== 3){
    res.status(400).send("Invalid client request");
  } 
  else{
    let { article, shopId, value } = req.body;
    const text = 'UPDATE product_count SET product_count = product_count+($1)'+ 
      'WHERE article_product = ($2) AND shop_id = ($3) RETURNING product_count';
    try{  
      const newCount = await pool.query(text, [value, article, shopId]);
      res.status(201).send(`product update: id ${newCount.rows[0].product_count}`);
      history.addCountHistory(article, shopId, value)
    }
    catch(err){
      console.log(err.message)
      res.status(500).json({"message": "error"}); 
    }
  }
}

const getCountFilter = async(req, res) => { 
  if(Object.keys(req.query).length === 0) {
    res.status(400).send("Invalid client request");
  }
  else{
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
        console.log('here');
        const text = 'SELECT product_name, product_article, shop_id, product_count FROM products JOIN product_count ON product_article = article_product WHERE product_name = ($1)';
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
  }
}

  module.exports = {
    getCountFilter,
    createProduct,
    createCount,
    subtractCount,
    addCount,
  }
  
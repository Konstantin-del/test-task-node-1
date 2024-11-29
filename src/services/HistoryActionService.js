const pool = require('../../config/db');

// async function createProductHistory(article, name){
//     const text = 'INSERT INTO product_history_action'+ 
//      '(article, shop_id, date_change, count) VALUES ($1, $2, $3, $4)';
//     await pool.query(text, [article, 0, new Date(), 0]);
// }
 
async function createCountHistory(article, shopId, count, productInOrder){
    const text = 'INSERT INTO product_history_action'+ 
     '(article, shop_id, date_change, count, count_in_order, action) VALUES ($1, $2, $3, $4, $5, $6)';
    await pool.query(text, [article, shopId, new Date(), count, productInOrder, "create"]);
}

async function subtractCountHistory(article, shopId, newCount){
    const text = 'INSERT INTO product_history_action'+ 
     '(article, shop_id, date_change, count) VALUES ($1, $2, $3, $4, $5)';
    await pool.query(text, [article, shopId, new Date(), newCount, subtract]);
}

async function addCountHistory(article, shopId, newCount){
    const text = 'INSERT INTO product_history_action'+ 
     '(article, shop_id, date_change, count) VALUES ($1, $2, $3, $4, $5)';
    await pool.query(text, [article, shopId, new Date(), newCount, add]);
} 

const getHistoryFilter = async(req, res) => { 
    if(Object.keys(req.query).length !== 2) {
        res.status(400).send("Invalid client request");
      }
      else{
        const {query, value} = req.query;
        if(query == "plu") {
          try {
            const text = 'SELECT shop_id, count FROM product_history_action WHERE article = ($1)';
            const result = await pool.query(text, [value]);
            res.status(200).json(result.rows); 
          } 
          catch (err) {
            res.status(500).json({ error: err.message });
          }
        }
        else if(query == "shop"){
          try {
            const text = 'SELECT shop_id, date_change, count, action FROM product_history_action WHERE shop_id = ($1)';
            const result = await pool.query(text, [value]);
            res.status(200).json(result.rows);
          } 
          catch (err) {
            res.status(500).json({ error: err.message });
          }
        }
        else if(query == "name"){
          try {
            const text = 'SELECT article_product, product_count FROM product_history_action WHERE shop_id = ($1)';
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
    getHistoryFilter,
    createCountHistory,
    subtractCountHistory,
    addCountHistory, 
}

 
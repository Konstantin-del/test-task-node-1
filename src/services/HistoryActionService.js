const pool = require('../../config/db');
 
async function createCountHistory(article, shopId, count){
    const text = 'INSERT INTO product_history_action'+ 
     '(article, shop_id, date_change, count, action_product) VALUES ($1, $2, current_date, $4, $5)';
    await pool.query(text, [article, shopId, count, "create"]);
}

async function subtractCountHistory(article, shopId, newCount){
    const text = 'INSERT INTO product_history_action'+ 
     '(article, shop_id, date_change, count, action_product) VALUES ($1, $2, current_date, $3, $4)';
    await pool.query(text, [article, shopId, newCount, "subtract"]);
}

async function addCountHistory(article, shopId, newCount){
    const text = 'INSERT INTO product_history_action'+ 
     '(article, shop_id, date_change, count, action_product) VALUES ($1, $2, current_date, $3, $4)';
    await pool.query(text, [article, shopId, newCount, "add"]);
} 

const getHistoryFilter = async(req, res) => { 
    if(Object.keys(req.query).length === 0) {
        res.status(400).send("Invalid client request");
      }
      else{
        const {query, value, date} = req.query;
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
            const text = 'SELECT shop_id, date_change, count FROM product_history_action WHERE shop_id = ($1)';
            const result = await pool.query(text, [value]);
            res.status(200).json(result.rows);
          } 
          catch (err) {
            res.status(500).json({ error: err.message });
          }
        }
        else if(query == "date"){
          try {
            const text = 'SELECT article, count FROM product_history_action WHERE date_change BETWEEN ($1) AND ($2)';
            const result = await pool.query(text, [value, date]);
            res.status(200).json(result.rows);
          } 
          catch (err) {
            res.status(500).json({ error: err.message });
          }
        }
        else if(query == "action"){
          try {
            const text = 'SELECT shop_id, date_change, count FROM product_history_action WHERE action_product = ($1)';
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

 
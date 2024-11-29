const pool = require('../../config/db');

async function createProductHistory(article, name){
    const text = 'INSERT INTO product_history_action'+ 
     '(article, name_prod, shop_id, date_change, count) VALUES ($1, $2, $3, $4, $5)';
    await pool.query(text, [article, name, 0, new Date(), 0]);
}
 
async function createProductHistory(article){
    const text = 'INSERT INTO product_history_action'+ 
     '(article, shop_id, date_change, count) VALUES ($1, $2, $3, $4)';
    await pool.query(text, [article, 0, new Date(), 0]);
}
   







module.exports = {
    createProductHistory 
}

    //const getActionWithProduct    
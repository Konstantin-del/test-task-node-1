const pool = require('../../config/db');

 const createProduct = async(req, res) => {
    const { name, article } = req.body
    if(!req.body) res.status(400).send("Invalid client request");
    try{
      const text = 'INSERT INTO products (product_name, product_article) VALUES ($1, $2) RETURNING id ';
      const values = [name, article];
      const product = await pool.query(text, values);
      const idProduct = product.rows[0].id;
      if(idProduct) res.status(201).send(`product added: id ${idProduct}`);
    }
    catch(err){
      console.log(err.message)
      res.status(507).json({"message": "error"}); 
    }
 }

 const createCount = async(req, res) => {
  let { nameShop, count, productInOrder, article } = req.body;
  if(!req.body) res.status(400).send("Invalid client request");
  let countProduct = Number(count);
  let countOrder = Number(productInOrder) ?? 0;
   const text = 'INSERT INTO product_in_shops (shop_name, product_count, product_in_order, article_product)' +
    'VALUES ($1, $2, $3, $4 ) RETURNING id ';
  const values = [nameShop, countProduct, countOrder, article];
  count = Number(count)
  try{  
    const counts = await pool.query(text, values);
    const idProduct = counts.rows[0].id;
    if(idProduct) res.status(201).send(`product added: id ${idProduct}`);
  }
  catch(err){
    console.log(err.message)
    res.status(507).json({"message": "error"}); 
  }
}

const getCount = async(req, res) => {  
    try {
      const result = await pool.query('SELECT * FROM products');
      res.status(200).json(result.rows);
    } 
    catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


  // const getUserById = (request, response) => {
  //   const id = parseInt(request.params.id)
  
  //   pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
  //     if (error) {
  //       throw error
  //     }
  //     response.status(200).json(results.rows)
  //   })
  // }
  
  // const createUser = (request, response) => {
  //   const { name, email } = request.body
  
  //   pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
  //     if (error) {
  //       throw error
  //     }
  //     response.status(201).send(`User added with ID: ${results.insertId}`)
  //   })
  // }
  
  // const updateUser = (request, response) => {
  //   const id = parseInt(request.params.id)
  //   const { name, email } = request.body
  
  //   pool.query(
  //     'UPDATE users SET name = $1, email = $2 WHERE id = $3',
  //     [name, email, id],
  //     (error, results) => {
  //       if (error) {
  //         throw error
  //       }
  //       response.status(200).send(`User modified with ID: ${id}`)
  //     }
  //   )
  // }
  
  // const deleteUser = (request, response) => {
  //   const id = parseInt(request.params.id)
  
  //   pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
  //     if (error) {
  //       throw error
  //     }
  //     response.status(200).send(`User deleted with ID: ${id}`)
  //   })
  // }

  module.exports = {
    getCount,
    createProduct,
    createCount,
  }
  
const express = require('express');
const router = require('./src/routes/ProductRoutes.js');


const app = express();
app.use(express.json());

app.get('/product/filter', router);
app.post('/product/create', router);
app.post('/product/count', router);
app.post('/product/subtract', router);
app.post('/product/add', router);
app.get('/product/history', router);

//app.get('/history', router);

app.listen(4444, (err) => {
    if(err){
        return console.log(err);
    }
    console.log('server ok');
});




// pool.end();
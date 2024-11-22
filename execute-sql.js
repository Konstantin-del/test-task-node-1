
const pg = require('pg');
const fs = require('fs');
const sql = fs.readFileSync('pg_agrigate.sql').toString();

const config = {
    user: 'postgres',
    database: 'task_test_node_1',
    password: 'fred',
    port: 5432,
}

const pool = new pg.Pool(config);

pool.connect((err, client, done)=>{
    if(err){
        console.log('error', err);
    }
    process.exit(0); // exit
});

pool.end();
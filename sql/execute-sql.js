require('dotenv').config();
const pg = require('pg');
const fs = require('fs');
const sql = fs.readFileSync('pg_agrigate.sql');
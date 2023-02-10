import { createRequire } from "module";
const require = createRequire(import.meta.url);
const {Pool} = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'stockfolio',
  schema: 'public',
  table: 'stockcatalogue',
  password: 'root',
  port: 5432,
});

pool.connect(function(err){
if(err) throw err;
console.log(`connected to stockfolio DB success`);
});

export default pool;
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const {Pool} = require('pg');
export const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'stockfolio',
    password:'root',
    port:'5432',
})

pool.connect(function(err){
    if (err) console.log(err);
    console.log('psql connection successfull...!'); 
})

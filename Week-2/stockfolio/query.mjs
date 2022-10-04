import { createRequire } from "module";
const require = createRequire(import.meta.url);

import pool from './psqlDBConnect.mjs';


const getITCatalogue = (req, res)=>{
    pool.query(`SELECT * FROM stockcatalogue`,(err,result)=>{
        if(err) throw err;
        res.status(200).json(result.rows)
    })
}

export default getITCatalogue;
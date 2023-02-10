import { createRequire } from "module";
const require = createRequire(import.meta.url);

import pool from './psqlDBConnect.mjs';


export const getITCatalogue = (req, res)=>{
    pool.query(`SELECT * FROM itcatalogue`,(err,result)=>{
        if(err) throw err;
        res.status(200).json(result.rows)
    })
}

export const getDividentCatalogue = (req, res)=>{
    pool.query(`SELECT * FROM dividentcatalogue`,(err,result)=>{
        if(err) throw err;
        res.status(200).json(result.rows)
    })
}


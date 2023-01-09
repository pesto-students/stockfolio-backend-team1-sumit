import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

import db from './mongoConnect.js';

const client = db;
 import {getITCatalogue, getDividentCatalogue} from './psqlQueries.mjs';
 //import{getBlockEstimation} from './mongoDbQueries.js';
 import * as modules from './stockfolioModules.js';


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

//var estimation = getBlockEstimation;
//console.log(estimation);

app.get('/itcatalogue', getITCatalogue)
app.get('/dividentcatalogue', getDividentCatalogue)

app.post('/estimate',async (req, res)=>{
  const {stock, buyPrice, date, quantity} = req.body

  var cagr = await modules.getcagr(stock);
  var userData = await modules.getUserEstimation(stock, date);
  var futureEstimation = await modules.getFutureEstimation(stock, quantity);
  var volatality = await modules.getVolatality(stock);

  var response = {"cagr%":cagr,
                  "analysis":userData,
                  "volatality%":volatality,
                   "prediction":futureEstimation}

    res.status(200).send(response);
  });

  app.post('/blockEstimate',(req, res)=>{

    const {blockName} = req.body

    var query = { blockName: `${blockName}` };

    client.collection("blockEstimations").find(query).toArray((err, result)=> {
     if (err) throw err;
     res.status(200).send({result});
   });
  });

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })







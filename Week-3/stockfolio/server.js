import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3001

import * as f from './getStockData.js';
 import {getITCatalogue, getDividentCatalogue} from './query.mjs';
 import * as modules from './stockfolioModules.js'

 async function test(){
var cagr = await modules.getcagr('TCS')
console.log(cagr);
 }

 var startYear = 2012;
 var date = `${startYear}-12-01`
// console.log(typeof(date));

 //test();

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/itcatalogue', getITCatalogue)
app.get('/dividentcatalogue', getDividentCatalogue)

app.post('/estimate',async (req, res)=>{
  const {stock, buyPrice, date, quantity} = req.body

  var cagr = await modules.getcagr(stock);
  var userData = await modules.getUserEstimation(stock, date);
  var futureEstimation = await modules.getFutureEstimation(stock, quantity);

  var response = {"cagr":cagr,
                  "analysis":userData,
                   "prediction":futureEstimation}

    res.status(200).send(response);
  });



app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })







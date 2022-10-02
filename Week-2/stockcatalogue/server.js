import { createRequire } from "module";
const require = createRequire(import.meta.url);
import {pool} from './psqlConnect.mjs';

var fetch = require('node-fetch');

let date_ob = new Date();

let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();


export default function insertStockData(){

    var symbolList = ['TCS', 'INFY', 'WIPRO', 'HCLTECH', 'TECHM', 'LTI', 'MINDTREE', 'MPHASIS', 'LTTS'];
    for (var symbols in symbolList){
        
        var startPriceUrl = `http://127.0.0.1:8000/historydata?symbol=${symbolList[symbols]}`;
        var currentPriceUrl = `http://127.0.0.1:8000/livedata?symbol=${symbolList[symbols]}`;


          const stockDataResponse = fetch(`http://127.0.0.1:8000/stockdetails?symbol=${symbolList[symbols]}`)
            .then(response => response.json())
            .then(json =>{
              const currentPriceResponse =  fetch(`http://127.0.0.1:8000/livedata?symbol=${symbolList[symbols]}`)
              .then( (res)=>res.json())
              .then((currentPrice)=>{

              const startPriceResponse =  fetch(`http://127.0.0.1:8000/historydata?symbol=TCS`)
              .then( (res)=>res.json())
              .then((startPrice) => {

              var CAGR = (((currentPrice/startPrice)**(1/10))-1)*100;

              const indication = (state)=>{
                if (currentPrice < json.priceInfo.open){
                   state = "down";
                } else {
                    state = "up";
                }
                return state;
            }

              var time = (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
              const catalogueData = (`INSERT INTO "stockcatalogue"("stock", "opening_bal", "closing_bal",
              "pchange", "cagr", "status", "industry", "timestamp") 
              VALUES($1, $2, $3, $4, $5, $6, $7, $8)`)
    
             var values = [json.info.symbol, json.priceInfo.open, json.priceInfo.lastPrice,
              json.priceInfo.pChange, CAGR, indication(), json.industryInfo.sector, time];
    
             pool.query(catalogueData, values)
          })
          .catch(err=>console.error(err))
        });

      });
    }

}


insertStockData();

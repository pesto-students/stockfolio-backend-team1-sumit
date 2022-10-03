import { createRequire } from "module";
const require = createRequire(import.meta.url);
import pool from './psqlDBConnect.mjs';

var fetch = require('node-fetch');

let date_ob = new Date();

let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();


export default function insertStockData(){

    var symbolList = ['TCS', 'INFY', 'WIPRO', 'HCLTECH', 'TECHM', 'MINDTREE', 'MPHASIS', 'OFSS', 'PERSISTENT'];
    for (var symbols in symbolList){


      const currentPriceResponse =   fetch(`http://127.0.0.1:8000/livedata?symbol=${symbolList[symbols]}`)
      .then( res => res.json())

      const startPriceResponse = fetch(`http://127.0.0.1:8000/historydata?symbol=${symbolList[symbols]}`)
      .then( res => res.json())

      const stockDataResponse = fetch(`http://127.0.0.1:8000/stockdetails?symbol=${symbolList[symbols]}`)
            .then(response => response.json())
            .then( async(json)=>{
        
              const getcagr = async()=>{
              const currentprice = await currentPriceResponse;
              const startprice = await startPriceResponse;
              var CAGR = (((currentprice/startprice)**(1/10))-1)*100;
              return CAGR;
            }

            const indication = async(state)=>{
              const currentprice = await currentPriceResponse;
                if (currentprice < json.priceInfo.open){
                   state = "down";
                } else {
                    state = "up";
                }
                return state;
            }
              
              const cagr = await getcagr();
              const state = await indication();

              var time = (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
              const catalogueData = (`INSERT INTO "stockcatalogue"("stock", "opening_bal", "closing_bal",
              "pchange","cagr" , "status", "industry", "timestamp") 
              VALUES($1, $2, $3, $4, $5, $6, $7, $8)`)
    
             var values = [json.info.symbol, json.priceInfo.open, json.priceInfo.lastPrice,
              json.priceInfo.pChange, cagr, state, json.industryInfo.sector, time];
    
             pool.query(catalogueData, values)
             
          })
          .catch(err=>console.error(err))

    }
    
  }


insertStockData();

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const MongoClient = require('mongodb').MongoClient;
var fetch = require('node-fetch');

export default function insertStockData(){

    var symbolList = ['TCS', 'INFY', 'WIPRO', 'HCLTECH', 'TECHM', 'MINDTREE', 'MPHASIS', 'OFSS', 'PERSISTENT'];
    for (var symbols in symbolList){

      const stockData = fetch(`http://127.0.0.1:8000/stockdetails?symbol=${symbolList[symbols]}`)
            .then(response => response.json())
            .then( async(json)=>{

                var obj = JSON.parse(JSON.stringify(json));

                const url = "mongodb+srv://developer:root@stockfolio.rnte1rd.mongodb.net/?retryWrites=true&w=majority"

                MongoClient.connect(url, function(err, client) {
                    if (err) throw err;
                    const dbo = client.db("ITStocks");
                    dbo.collection("individualStockData").insertOne(obj, function(err, res) {
                    if (err) throw err;
                    console.log(`successfully inserted into mongodb`);

                  });

                });
          })
          .catch(err=>console.error(err))

    }
    
}
  insertStockData();
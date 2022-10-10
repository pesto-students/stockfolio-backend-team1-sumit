import { createRequire } from "module";
const require = createRequire(import.meta.url);

const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
var fetch = require('node-fetch');

export default function insertStockData(){

    var symbolList = ['TCS', 'INFY', 'WIPRO', 'HCLTECH', 'TECHM', 'MINDTREE', 'MPHASIS', 'OFSS', 'PERSISTENT', 'NMDC', 'VEDL', 'RECLTD', 'ONGC', 'OIL', 'GAIL', 'PFC', 'OFSS', 'TIDEWATER', 'TATASTEEL'];
    for (var symbols in symbolList){

      const stockData = fetch(`http://127.0.0.1:8000/stockdetails?symbol=${symbolList[symbols]}`)
            .then(response => response.json())
            .then( async(json)=>{

                var obj = JSON.parse(JSON.stringify(json));

                const url = "mongodb+srv://developer:root@stockfolio.rnte1rd.mongodb.net/?retryWrites=true&w=majority"

                MongoClient.connect(url, function(err, client) {
                    if (err) throw err;
                    const dbo = client.db("stockfolio");
                    dbo.collection("individualStockData").insertOne(obj, function(err, res) {
                    if (err) throw err;
                    console.log(`successfully inserted into mongodb`);

                  });

                });
          })
          .catch(err=>console.error(err))

    }
    
}

export function insertCharges(){

  const url = "mongodb+srv://developer:root@stockfolio.rnte1rd.mongodb.net/?retryWrites=true&w=majority"

  MongoClient.connect(url, function(err, client) {
    if (err) throw err;

    var myobj = fs.readFileSync("defaultTax&Charges.json").toString();
    myobj = JSON.parse(myobj);
    const dbo = client.db("stockfolio");
    dbo.collection("defaultCharges").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log(`successfully inserted into mongodb`);

  });
  var obj = fs.readFileSync("brokerCharges.json").toString();
  obj = JSON.parse(obj);
  dbo.collection("stockBrokerCharges").insertOne(obj, function(err, res) {
    if (err) throw err;
    console.log(`successfully inserted into mongodb`);

  });
  });
  }

  //insertCharges();
  //insertStockData();
  
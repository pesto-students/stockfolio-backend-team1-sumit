import { createRequire } from "module";
const require = createRequire(import.meta.url);

var yfinance = require('yfinance');
 
yfinance.getHistorical('JNJ', '2016-08-01', '2016-08-05', function (err, data) {
    if(err) console.log(err);
    //...
    console.log(data);
});

/*@app.get("/peratio")
def livedata(symbol):
    if symbol is None:
        text = "incomplete information provided"
        return text
    else:
        symbol = yf.Ticker("infy").info
        symbol["trailingPE"]
        symbol["forwardPE"]
        return */
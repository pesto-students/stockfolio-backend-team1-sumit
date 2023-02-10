from nsepython import *
from nsepy.urls import *
from nsepy import *
from datetime import date
from fastapi import FastAPI
import numpy as np

app = FastAPI()


@app.get("/livedata")
def livedata(symbol):
    if symbol is None:
        text = "incomplete information provided"
        return text
    else:
        data = nse_eq(symbol)['priceInfo']['lastPrice']
        return data

@app.get("/stockdetails")
def data(symbol = None):
    if symbol is None:
        text = "missing symbol"
        return text

    else:
       return nse_eq(symbol)


@app.get("/historydata")
def data(symbol):
    if symbol is None:
        text = "incomplete information provided"
        return text
    else:
      symbol = symbol
      series = "EQ"
      start_date = "01-01-2012"
      end_date ="02-01-2012"
      h = equity_history(symbol,series,start_date,end_date)
      f=f'{h.VWAP}'
      result = f[5]+f[6]+f[7]+f[8]+f[9]+f[10]
      return result




import {priceSum, getCagr, getCurrentPrice} from './psqlQueries.mjs';

//blockCalculation('itcatalogue');

 export default async function blockCalculation(table){

    const blockTotal = await priceSum(table);
    const cagrset = await getCagr(table);
    const priceset = await getCurrentPrice(table);

       let finalEstimation=0;
       let estimatedPrice=[];
       let j =0;
       
    while(j<= (priceset.length-1)){
    
        var annualRate = (((cagrset[j]/100)+1)*priceset[j]);
        estimatedPrice[j] = Number(annualRate).toFixed(2);
        finalEstimation += annualRate;
        annualRate=0;
    
        j++;
    }
    
    //console.log("current block price: " +Number(blockTotal).toFixed(2));
    //console.log("estimated stock prices: "+estimatedPrice);
    //console.log("Estimated Block returns: "+Number(finalEstimation).toFixed(2));

    const obj = {
        "blockName" : table,
        "blockTotalPrice" : Number(blockTotal).toFixed(2),
        "blockAnnualReturns" : Number(finalEstimation).toFixed(2),
        "stocksAnnualReturns" : estimatedPrice
    } 

    return obj;
    
    }


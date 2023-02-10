import { createRequire } from "module";
const require = createRequire(import.meta.url);
import bodyParser from "body-parser";
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require("mongodb").ObjectID;
const express =require('express');
const app = express();
const PORT = process.env.PORT || 4060;

 var database, collection;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get("/posts", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.listen(PORT, () => {
    MongoClient.connect("mongodb://127.0.0.1:27017/NewsApiDB", { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db("NewsApiDB");
        collection = database.collection("posts");
        console.log("Connected to `" + "NewsApiDB" + "`!");
    });
});
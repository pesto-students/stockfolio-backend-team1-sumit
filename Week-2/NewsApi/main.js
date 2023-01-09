import fetch from "node-fetch";
import mongoose from "mongoose";
import mongoose from "mongoose-type-url";

mongoose.connect("mongodb://localhost:27017/StockfolioNewsApiDb");

var postSchema = new mongoose.Schema({
    pagination : {
        limit : {
            type : Number,
            required : true
        },
        offset : {
            type : Number,
            required : true
        },
        count : {
            type : Number,
            required : true
        },
        total : {
            type : Number,
            required : true
        }
    },
    data : {
        // author : {
        //     type : undefined,
        //     required : true
        // },
        title : {
            type : String,
            required : true
        },
        description : {
            type : String,
            required : true
        },
        url : {
            type : String,
            required : true
        },
        source : {
            type : String,
            required : true
        },
        // image : {
        //     type : undefined,
        //     required : true
        // },
        category : {
            type : String,
            required : true
        },
        language : {
            type : String,
            required : true
        },
        country : {
            type : String,
            required : true
        },
        published_at : {
            type : String,
            required : true
        },
    }  
});

const Post = mongoose.model('Post', postSchema);

async function getPosts() {
    const myPosts = await fetch("http://api.mediastack.com/v1/news?access_key=500e312172f1e754df97ecf56249d5ec&keywords=stocks&countries=in&language=en");
    const response = await myPosts.json();
    for(let i = 0; i < response.length; i++) {
       
        const post =new Post({
            pagination: {
                limit : response[i]['limit'],
                offset : response[i]['offset'],
                count : response[i]['count'],
                total : response[i]['total'],
            },
            data: {
                author : response[i]['author'],
                title : response[i]['title'],
                description : response[i]['description'],
                url : response[i]['url'],
                source : response[i]['source'],
                image : response[i]['image'],
                category : response[i]['category'],
                language : response[i]['language'],
                country : response[i]['country'],
                published_at : response[i]['publishedAt'],
            }
           
        });
        post.save();
    }
}
getPosts();





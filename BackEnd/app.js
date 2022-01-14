// Express: lib for server, support HTTP, HTTPs and middleware to create a API useful and robust
const express = require('express');
const morgan = require('morgan');
// Using mongoose to connect db
const mongoose = require('mongoose')
const app = express();

// Using lib to read all enviroment variables in .env file
require('dotenv/config');

const api = process.env.API_URL;

// Apply to parse json data which comes from the frontend to the backend
//express.json():  Returns middleware that only parses json 
app.use(express.json());

// LOG lib: Apply HTTP method in console by tiny, search lib on npm to get detail
// Example a record when using PostMan or Inspector: POST /api/v1/product/create 200 47 - 8.582 ms
app.use(morgan('tiny'))


app.get(`${api}`, (req, res) => {
    res.send("Wellcome to eshop API, Let's try navigate to /product for first API");
})

app.get(`${api}/product`, (req, res) => {
    const product = {
        id: 1,
        name: "Hair dresser",
        image: "some url"
    }
    res.send(product);
})

//----------------- Schema -----------------//
const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: Number
});

//----------------- Model  -----------------//
const Product = mongoose.model("Product", productSchema);

app.post(`${api}/product/create`, (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    });
    product.save().then(createdStatus => {
        console.log("createdStatus", createdStatus)
        res.status(201).json(createdStatus)
    }).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

/**
 * Connection  from mongodb atlas cluster
 * Return: Promise to check connected or not
 */
mongoose.connect(process.env.CONNECTION_STRING).then(res => {
    console.warn("Connected to DB successfully !!!")
}).catch((err) => {
    console.warn("Connected to DB failed  !!!", err)
});

// Using listen to return a server port 3000 as first agrument we paseds
app.listen(3000, () => {
    console.log("Server is running http://localhost:3000/api/v1");
})
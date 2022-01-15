const express = require('express'); // Express: lib for server, support HTTP, HTTPs and middleware to create a API useful and robust
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose'); // Using mongoose to connect db
const productsRouter = require('./routers/product');
const cors = require('cors')
require('dotenv/config'); // Using lib to read all enviroment variables in .env file

app.use(cors()); //Allow others port to have ability call HTTP from this Node.js server. Example 4200 can call to 3000(this server BE)
app.options('*', cors()); // option to allow HTTP: Post, Put, Delete,.. (*) for all. Search HTTP Options for more Allow type.

const api = process.env.API_URL; //"/api/v1"

app.use(express.json()); // A middleware, Apply to parse json data which comes from the frontend to the backend

// LOG lib: Apply HTTP method in console by tiny, search lib on npm to get detail
// Example a record when using PostMan or Inspector: POST /api/v1/product/create 200 47 - 8.582 ms
app.use(morgan('tiny')) 

app.get(`${api}`, (req, res) => {
    res.send("Wellcome to eshop API, Let's try navigate to /product for first API");
})

// Routers
app.use(`${api}/product`, productsRouter);

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
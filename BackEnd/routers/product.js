const express = require('express');
const {Product} = require('../models/product')
const router = express.Router();

router.get('/', async (req, res) => {
    const productList = await Product.find()
    if(productList) {
        res.send(productList);
        return;
    }
    res.status(200).json({msg: "Data not found!"});
})

router.post('/create', (req, res) => {
    const product = new Product({ name: req.body.name,  image: req.body.image, countInStock: req.body.countInStock });
    
    product.save().then(createdStatus => {
        res.status(201).json(createdStatus)
    }).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

// export this router as module for app.js can using.
module.exports = router;
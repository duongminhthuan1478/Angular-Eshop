const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Category } = require('../models/category');
const { Product } = require('../models/product');

router.get('/', async (req, res) => {
    let filter = {};
    //Query param Example: http://localhost:3000/api/v1/products?categories=5f15d54cf3a046427a1c26e3,5f15d545f3a046427a1c26e2
    if(req.query.categories) {
        filter = {category: req.query.categories.split(',')} // Split all query param value into array and filter
    }
    // populate('field') to display all fields of Category record instead of only ObjectId like category model
    const products = await Product.find(filter).populate("category");
    if(products) {
        res.status(200).send({success: true, size: products.length, data: products});
        return;
    }
    res.status(500).json({success: false, message: "Data not found!"});
});

router.get('getProductById/:id', async (req, res) => {
    // populate('field') to display all detail of Category record instead of only ObjectId like category model
    const product = await Product.findById(req.params.id).populate('category');
    if(!product) {
        res.status(500).json({success: false, message: 'The product with id was not found!!'});
        return;
    }
    res.status(200).send({success: true, data: product});
});

/** Return a list Product with only image field and no _id */ 
router.get('/images', async (req, res) => {
    const images = await Product.find().select("image -_id");
    if(images) {
        res.status(200).send({success: true, data: images});
        return;
    }
    res.status(500).json({success: false, message: "Data not found!"});
});

/** Return total products document(record) */ 
router.get('/count', async (req, res) => {
    const productCount = await Product.countDocuments();
    if(productCount) {
        res.status(200).send({success: true, count: productCount});
        return;
    }
    res.status(500).send({success: false, message: "Product not found!"});
});

/**
 * count: number record will get
 * Return list products with Featured is true
 * */ 
router.get('/list-product-featured/:count', async (req, res) => {
    const count = req.params.count ? req.params.count :  0;
    const products = await Product.find({isFeatured: true}).limit(+count); //+count: cast to number
    if(products) {
        res.status(200).send({success: true, size: products.length, data: products});
        return;
    }
    res.status(500).send({success: false, message: "Product not found!"});
});

router.post('/create', async(req, res) => {
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send("Invalid Category !!")

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock, 
        rating: req.body.rating, 
        numReviews: req.body.numReviews, 
        isFeatured: req.body.isFeatured 
    });

    product = await product.save();
    if(!product)return res.status(500).send('The product cannot be created!');
    res.send({success: true, message: "Product was created successfully"}); // send model
});

router.put('/update/:id', async (req, res) => {
    // Validation ID: Ex: moongose id type is Object Id: 5f15d467f3a046427a1c26e1
    // If we pass update/1 so the application will throw exception and hang on others request
    // So we need to handle this to intercep exception throw back when handle short code with await async
    if(!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send("Invalid Product Id !!");
    }

    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send("Invalid Category !!");

    const newProduct = {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock, 
        rating: req.body.rating, 
        numReviews: req.body.numReviews, 
        isFeatured: req.body.isFeatured 
    }

    // Short code
    //{new: true}: option to return new product after update instead of old data
    const product = await Product.findByIdAndUpdate(req.params.id, newProduct, {new: true}); //Return a object if success. Otherwise return null
    if(!product) return res.status(500).send('The product cannot be updated!');
    res.send({success: true, message: "Product was saved successfully"}); // send model
});

router.delete('/delete/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id).then(product => {
        if(product) { //findByIdAndRemove  passing the found document (if any) to the callback.
            res.status(200).json({success: true, message: 'The product was deleted'});
        } else {
            res.status(404).json({success: false, message: 'Product not found!!'});
        }
    }).catch((error) => {
        res.status(400).json({success: false, error});
    })
});

// export this router as module for app.js can using.
module.exports = router;
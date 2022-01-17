const express = require('express');
const {Category} = require('../models/category')
const router = express.Router();

router.get('/', async (req, res) => {
    const categories = await Category.find()
    if(categories) {
        res.status(200).send({sucess: true, data: categories});
        return;
    }
    res.status(500).json({success: false, message: "Data not found!"});
})

router.get('getCategoryById/:id', (req, res) => {
    const category = Category.findById(req.params.id)
    if(!category) {
        res.status(500).json({success: false, message: 'The category with id was not found!!'});
        return;
    }
    res.status(200).send({success: true, data: category});
    
});

router.post('/create', async (req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
    })
    
    // shorted code
    category = await category.save(); //Return a object if success. Otherwise return null
    if(!category) return res.status(500).send('The category cannot be created!');
    res.send({success: true, message: "Category was created successfully"}); // send model
});

router.put('/update/:id', async (req, res) => {
    const newCateGory = {
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    }

    //{new: true}: option to return new category after update instead of old data
    const category = await Category.findByIdAndUpdate(req.params.id, newCateGory, {new: true}); //Return a object if success. Otherwise return null
    if(!category) return res.status(500).send('The category cannot be updated!');
    res.send({success: true, message: "Category was saved successfully"}); // send model
});

router.delete('/delete/:id', (req, res) => {
    Category.findByIdAndRemove(req.params.id).then(category => {
        if(category) { //findByIdAndRemove  passing the found document (if any) to the callback.
            res.status(200).json({success: true, message: 'The category was deleted'});
        } else {
            res.status(404).json({success: false, message: 'Category not found!!'});
        }
    }).catch((error) => {
        res.status(400).json({success: false, error});
    })
});


// export this router as module for app.js can using.
module.exports = router;
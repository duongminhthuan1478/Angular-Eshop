const express = require('express');
const { Order } = require('../models/order');
const { OrderItem } = require('../models/order-item');
const { Product } = require('../models/product');
const mongoose = require('mongoose');
const router = express.Router();
const stripe = require('stripe')('sk_test_51KVDkGGDprsjyIrqDUhzGiltPiu6mDOyHENzsI05HvF7xds8R90t8NMJl2amChJEE3IMg46Lo7PpgY7OFgpMAbUQ00k1XRDce9');

router.get('/', async (req, res) => {
    //-1 desc. Check document sort method
    const orders = await Order.find().populate('user', 'name country phone').sort({'dateOrdered': -1}) 
    if(orders) {
        res.status(200).send({success: true, size: orders.length, data: orders});
        return;
    }
    res.status(500).json({success: false, message: "Data not found!"});
})

router.get('/getOrderById/:id', async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send({success: false, message: "Invalid Order Id !!"});
    }

    const order = await Order.findById(req.params.id)
                .populate('user', 'name country phone')
                .populate(  //Populate each product with name & description in array orderItems, and populate category in product
                    {path: 'orderItems', populate: {path: 'product', populate: 'category'}
                });
    if(!order) {
        res.status(500).json({success: false, message: 'The order with id was not found!!'});
        return;
    }
    res.status(200).send({success: true, data: order});
});

router.get('/getTotalSales', async (req, res) => {
    // aggregate: Sum of all order totalPrice
    const totalSales= await Order.aggregate([
        // cannot remove id, because mongoose cannot return any object without an id
        { $group: {_id: null, totalSales: { $sum: '$totalPrice'}}}
    ])
    if(!totalSales) {
        res.status(400).json({success: false, message: 'The order sales cannot be generated'});
        return;
    }
    res.status(200).send({success: true, totalSales: totalSales.pop().totalSales});
});


router.get('/user-orders/:userId', async (req, res) => {
    const userOrders = await Order.find({user: req.params.userId})
    .populate('user', 'name country phone id')
    .populate(  //Populate each product with name & description in array orderItems, and populate category in product
        {path: 'orderItems', populate: {path: 'product', populate: 'category'}
    }).sort({'dateOrdered': -1}); 
    if(userOrders) {
        res.status(200).send({success: true, data: userOrders});
        return;
    }
    res.status(500).json({success: false, message: "Contact to admin for this api"});
});

/** Return total products document(record) */ 
router.get('/count', async (req, res) => {
    const orderCount = await Order.countDocuments();
    if(orderCount) {
        res.status(200).send({success: true, count: orderCount});
        return;
    }
    res.status(500).send({success: false, message: "Order not found!"});
});

router.post('/create', async (req, res) => {
    // req.body.orderItems = ["id1", "id2"], many oderItem, and await will return Promise
    const orderItemsIds = Promise.all(req.body.orderItems.map(async item => {
        let newOrderItem = new OrderItem({
            quantity: item.quantity,
            product: item.product
        });

       // async-await will return promises equivalently with number of orderItems[] => Using promise.all to combine all promise from await newOrderItem.save()
        newOrderItem = await newOrderItem.save(); 
        // Save db and return id 
        return newOrderItem._id;
    }));

    const orderItemsIdsResolved = await orderItemsIds;
    console.log("orderItemsIdsResolved", orderItemsIdsResolved)
    
    // I dont want FE calculate total price because, it's can be fake price 1000 > 1 through API create 
    let totalPrice = 0;
    // async-await will return promises equivalently with number of orderItem[] => Using promise.all to combine all promise from await OrderItem.findById(orderItemId).populate('product', 'price');
    await Promise.all(orderItemsIdsResolved.map(async orderItemId => {
        const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
        const productPrice = orderItem.quantity * orderItem.product.price;
        totalPrice = totalPrice + productPrice;
        return totalPrice;
    }));

    // Because I using async-await so. All handle will be synchoronous. We got orderItemsIdsResolved, totalPrice after handle above
    let order = new Order({
        orderItems: orderItemsIdsResolved,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
        user: req.body.user
    })
    
    // shorted code
    order = await order.save(); //Return a object if success. Otherwise return null
    if(!order) return res.status(500).send({success: false, message: 'The order cannot be created!'});
    res.send({success: true, message: "Order was created successfully", data: order}); // send model
});

router.post('/create-checkout-session', async (req, res) => {
    const orderItems = req.body;
    if(!orderItems) return res.status(400).send({success: false, message: 'Checkout session cannot be created - check items again!'});

    const lineItems = await Promise.all(
        // Map data to same object at stripe: https://stripe.com/docs/payments/accept-a-payment
        orderItems.map(async (item) => {
            const product = await Product.findById(item.product);
            return {
                price_data: {
                  currency: 'usd',
                  product_data: {
                    name: product.name,
                  },
                  unit_amount: Math.floor((product.price / 23000) *100), //1$ = 100cent
                },
                quantity: item.quantity,
            }
        })
    );
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:4100/checkout-success',
        cancel_url: 'http://localhost:4100/checkout-falied'
    });
    res.json({id: session.id})
});


router.put('/update-status/:id', async (req, res) => {
    const payload = {
        status: req.body.status,
    }

    //{new: true}: option to return new order after update instead of old data
    const order = await Order.findByIdAndUpdate(req.params.id, payload, {new: true});
    if(!order) return res.status(500).send({success: false, message: 'The order status cannot be updated!'});
    res.send({success: true, message: "The order status was saved successfully"}); // send model
});

router.delete('/delete/:id', async (req, res) => {
    // Order.findByIdAndRemove(req.params.id).then(async order => {
    //     if(order) { //findByIdAndRemove  passing the found order document (if any) to the callback.
    //         // remove all order-item
    //         await order.orderItems.map(async orderItem => {
    //             await OrderItem.findByIdAndRemove(orderItem)
    //         })

    //         res.status(200).json({success: true, message: 'The order was deleted'});
    //     } else {
    //         res.status(404).json({success: false, message: 'The Order not found!!'});
    //     }
    // }).catch((error) => {
    //     res.status(400).json({success: false, error});
    // })


    // Way 2: for reduce async/await
    Order.findByIdAndDelete(req.params.id).then(order=>{
        if(!order){
            return res.status(404).json({success: false, message: 'The Order not found!!'});
        }
        else{
            OrderItem.deleteMany({_id:{$in: order.orderItems}}).then(orderItem=>{
                console.log("orderItem", orderItem)
                if(!orderItem){ // return object { deletedCout: number}
                    return res.status(404).send('Could not delete OrderItem')
                }
                else{
                    return res.status(200).json({success:true,message:'Successfully Deleted Order'})
                }
            })
        }
    }).catch(err=> {
        res.status(400).json({success: false, error});
    })
});

// export this router as module for app.js can using.
module.exports = router;
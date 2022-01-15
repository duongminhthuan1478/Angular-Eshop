const mongoose = require('mongoose');

//----------------- Schema -----------------//
const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true
    }
});

//----------------- Model  -----------------//
// Export for app.js using this model.This syntax different to Angular just export instead
exports.Product = mongoose.model("Product", productSchema);
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {type: String, require: true},
    description: {type: String, require: true},
    richDescription: {type: String, default: ''},
    image: {type: String, default: ''},
    images: [{type: String}], //String[]
    brand: {type: String, default: ''},
    price: {type: Number, default: 0},
    category: {
        type: mongoose.Schema.Types.ObjectId,  //Type ObjectId of Category Schema
        ref: 'Category', //Ref a record of category from Id above
        require: true
    },
    countInStock: {type: Number, required: true, min: 0, max: 1000},
    rating: {type: Number, default: 0},
    numReviews: {type: Number, default: 0},
    isFeatured: {type: Boolean, default: false},
    dateCreated: {type: Date, default: Date.now()}
});

///Start: copy new "id" field from "_id", and append to JSON for more friendly ///
productSchema.virtual('id').get(function (){
    return this._id.toHexString(); //Returns the ObjectId id as a 24 character hex string representation
})

productSchema.set('toJSON', {
    virtuals: true
})
///End: copy new "id" field from "_id", and append to JSON for more friendly ///

//----------------- Model  -----------------//
// Export for app.js using this model.This syntax different to Angular just export instead
exports.Product = mongoose.model("Product", productSchema);
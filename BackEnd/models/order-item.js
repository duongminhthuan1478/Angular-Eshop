const mongoose = require('mongoose');

const orderItemSchema = mongoose.Schema({
    quantity: {type: Number, require: true},
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', //Ref a record of OrderItem from Id above
        require: true
    },
});


orderItemSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
orderItemSchema.set('toJSON', {
    virtuals: true,
});


exports.OrderItem = mongoose.model("OrderItem", orderItemSchema);
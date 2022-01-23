const mongoose = require('mongoose');
const Constants = require('./../constants/constant')

const orderSchema = mongoose.Schema({
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem', //Ref a record of OrderItem from Id above
        require: true
    }],
    shippingAddress1: {type: String, require: true},
    shippingAddress2: {type: String},
    city: {type: String, require: true},
    zip: {type: String, require: true},
    country: {type: String, require: true},
    phone: {type: String, require: true},
    status: {type: String, require: true, default: Constants.ORDER_STATUS.PENDING},
    totalPrice: {type: Number},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', //Ref a record of User from Id above
    },
    dateOrdered: {
        type: Date,
        default: Date.now // Automatic created date when update/create.., no need to pass this field
    }
});


orderSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
orderSchema.set('toJSON', {
    virtuals: true,
});


exports.Order = mongoose.model("Order", orderSchema);
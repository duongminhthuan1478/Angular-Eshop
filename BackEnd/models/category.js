const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {type: String, require: true},
    icon: {type: String},
    color: {type: String},
});



///Start: copy new "id" field from "_id", and append to JSON for more friendly ///
categorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

categorySchema.set('toJSON', {
    virtuals: true,
});
///End: copy new "id" field from "_id", and append to JSON for more friendly ///

//----------------- Model  -----------------//
// Export for app.js using this model.This syntax different to Angular just export instead
exports.Category = mongoose.model("Category", categorySchema);
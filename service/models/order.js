const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    mongooseUniqueValidator = require('mongoose-unique-validator');

const schema = new Schema ({
landLord: {type: Schema.Types.ObjectId, ref: 'User' ,required:true, unique: true},
tenant: {type: Schema.Types.ObjectId, ref: 'User' ,required:true, unique: true},
amountToPay: {type: Number,required:true} //BI handles the math (per days includes dicounts if any)
}, {
    collection: 'orders'
});

schema.plugin(mongooseUniqueValidator);

const Order = mongoose.model('Order', schema);

module.exports = Order;

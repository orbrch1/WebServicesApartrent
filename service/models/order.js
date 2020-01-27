const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    mongooseUniqueValidator = require('mongoose-unique-validator');

const schema = new Schema ({
landLord: {type: Schema.Types.ObjectId, ref: 'User' ,required:true, unique: true},
publication: {type: Schema.Types.ObjectId, ref: 'Publication' ,required:true, unique: true},
tenant: {type: Schema.Types.ObjectId, ref: 'User' ,required:true, unique: true},
//amountToPay: {type: Number,required:true}, //BI handles the math (per days includes dicounts if any)
//pricePerDay: {type: Schema.Types.ObjectId, ref: 'Apartrent', required:true }, publication
//pricePerDay: {type: Schema.Types.ObjectId, ref: ' Publication', required:true },
totalPrice: {type:Number, required:true},
tenantStartDate: {type: Schema.Types.ObjectId, ref: 'Offer', required:true },
tenantEndDate: {type: Schema.Types.ObjectId, ref: 'Offer', required:true },
approvedOfferDate: {type: Schema.Types.ObjectId, ref: 'Offer', required:true } 
}, {
    collection: 'orders'
});

schema.plugin(mongooseUniqueValidator);

const Order = mongoose.model('Order', schema);

module.exports = Order;

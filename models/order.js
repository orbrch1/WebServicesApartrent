const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    mongooseUniqueValidator = require('mongoose-unique-validator');

const schema = new Schema ({
landLord: {type: Schema.Types.ObjectId, ref: 'User' ,required:true, unique: true},
tenant: {type: Schema.Types.ObjectId, ref: 'User' ,required:true, unique: true},
name: {type:String, required:true},
gender: {type: String, enum: ['male','female'] ,required:true},
username: {type: String, required:true},
email: {type: String, required:true},
phone:{type: String, required:false},
numberOfRents: {type: Number, required:true}
}, {
    collection: 'orders'
});

schema.plugin(mongooseUniqueValidator);

const Order = mongoose.model('Order', schema);

module.exports = Order;

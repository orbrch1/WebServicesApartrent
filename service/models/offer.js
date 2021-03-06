const mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        mongooseUniqueValidator = require('mongoose-unique-validator');

const schema = new Schema ({
    tenant: {type: Schema.Types.ObjectId, ref: 'User' ,required:true, unique: true},
    tenantStartDate: {type:Date, require: true},
    tenantEndDate: {type:Date, require: true},
    apartment:  {type: Schema.Types.ObjectId, ref: 'Apartment' ,required:true, unique: true},
    currentDate: {type:Date, require:true}
 }, {
    collection: 'offers'
});

schema.plugin(mongooseUniqueValidator);

const Offer = mongoose.model('Offer', schema);

module.exports = Offer;
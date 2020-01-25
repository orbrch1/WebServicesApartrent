const mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        mongooseUniqueValidator = require('mongoose-unique-validator');

const schema = new Schema ({
    landLord: {type: Schema.Types.ObjectId, ref: 'User' ,required:true, unique: true},
    tenant: {type: Schema.Types.ObjectId, ref: 'User' ,required:true, unique: true},
    tenantStartDate: {type:Date, require: true},
    tenantEndDate: {type:Date, require: true},
    currentDate: {type:Date, require:true}
 }, {
    collection: 'offers'
});

schema.plugin(mongooseUniqueValidator);

const Offer = mongoose.model('Offer', schema);

module.exports = Offer;
const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      mongooseUniqueValidator = require('mongoose-unique-validator');

const schema = new Schema ({
landLord: {type: Schema.Types.ObjectId, ref: 'User' ,required:true, unique: true},
coordinate: {type:String, required:true},
numberOfRooms: {type: Number, required:true},
numberOfBeds: {type: Number, required:true},
startDate: {type:Date, require: true},
endDate: {type:Date, require: true},
isFurnished: {type: String, enum: ['yes','no','partial'] ,required:true},
numOfParking: {type: Number ,required:true},
hasAC: {type: Boolean, default:false, required:true},
price: {type: Number, required: true},
inUse: {type: Boolean, default:false, required:true},
}, {
    collection: 'apartments'
});

schema.plugin(mongooseUniqueValidator);

const Apartment = mongoose.model('Apartment', schema);


module.exports = Apartment;

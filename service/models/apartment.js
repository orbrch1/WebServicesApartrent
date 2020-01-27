const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      mongooseUniqueValidator = require('mongoose-unique-validator');

const schema = new Schema ({
landLord: {type: Schema.Types.ObjectId, ref: 'User' ,required:true, unique: true},
coordinate: {type:String, required:true},
apartmentNumber: {type:Number, required:false}, //to handle incase of villa where there's one apartment in the building
numberOfRooms: {type: Number, required:true},
// photo: {type: photo, required:false},  
numberOfBeds: {type: Number, required:true},
//startDate: {type:Date, require: true},
//endDate: {type:Date, require: true},
isFurnished: {type: String, enum: ['yes','no','partial'] ,required:true},
numOfParking: {type: Number ,required:true},
hasAC: {type: Boolean, default:false, required:true},
//pricePerDay: {type: Number, required: true},
inUse: {type: Boolean, default:false, required:true}
}, {
    collection: 'apartments'
});

schema.plugin(mongooseUniqueValidator);

const Apartment = mongoose.model('Apartment', schema);


module.exports = Apartment;





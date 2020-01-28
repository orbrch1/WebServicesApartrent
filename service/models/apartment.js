const mongoose = require('mongoose'),
      Schema = mongoose.Schema;
     mongooseUniqueValidator = require('mongoose-unique-validator');

const schema = new Schema ({
landLord: {type: Schema.Types.ObjectId, ref: 'User', unique: true ,required:true},
coordinate: {type:String, required:true},
apartmentNumber: {type:Number, required:false}, //to handle incase of villa where there's one apartment in the building
numberOfRooms: {type: Number, required:true},
//photo: {type: Schema.Types.ObjectId, ref: 'File' ,required:false, unique: true},  
numberOfBeds: {type: Number, required:true},
isFurnished: {type: String, enum: ['yes','no','partial'] ,required:true},
numOfParking: {type: Number ,required:true},
hasAC: {type: Boolean, default:false, required:true},
inUse: {type: Boolean, default:false, required:true}
}, {
    collection: 'apartments'
});

schema.plugin(mongooseUniqueValidator);

const Apartment = mongoose.model('Apartment', schema);


module.exports = Apartment;





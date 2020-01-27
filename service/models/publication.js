const mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        mongooseUniqueValidator = require('mongoose-unique-validator');

const schema = new Schema ({
    apartment:  {type: Schema.Types.ObjectId, ref: 'Apartment' ,required:true, unique: true},
    startDate: {type:Date, require: true},
    endDate: {type:Date, require: true},
    pricePerDay: {type: Number ,required:true,},
    currentDate: {type:Date, require:true}
 }, {
    collection: 'publications'
});

schema.plugin(mongooseUniqueValidator);

const Publication = mongoose.model('Publication', schema);

module.exports = Publication;
const mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        mongooseUniqueValidator = require('mongoose-unique-validator');

const schema = new Schema ({
    content: {type:String, required:true},
    user: {type: Schema.Types.ObjectId, ref: 'User' ,required:true, unique: true},
    levels: {type: Number, required:true},
    currentDate: {type: Date, required:true},
    apartment: {type: Schema.Types.ObjectId, ref: 'Apartment' ,required:true, unique: true}
}, {
    collection: 'reviews'
});

schema.plugin(mongooseUniqueValidator);

const Review = mongoose.model('Review', schema);

module.exports = Review;
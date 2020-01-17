const mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        mongooseUniqueValidator = require('mongoose-unique-validator');

const schema = new Schema ({
    content: {type:String, required:true},
    user: {type: Schema.Types.ObjectId, ref: 'User' ,required:true, unique: true},
    levels: {type: Number, required:true}
}, {
    collection: 'reviews'
});

schema.plugin(mongooseUniqueValidator);

const Review = mongoose.model('Review', schema);

module.exports = Review;
const mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        mongooseUniqueValidator = require('mongoose-unique-validator');

const schema = new Schema ({
    landlord: {type: Schema.Types.ObjectId, ref: 'User',unique: true, required:true},
    tenant: {type: Schema.Types.ObjectId, ref: 'User', unique: true, required:true },
    content: {type:String, required:true},
    currentDate: {type:Date, require:true}
     }, {
    collection: 'messages'
});

schema.plugin(mongooseUniqueValidator);

const Message = mongoose.model('Message', schema);

module.exports = Message;
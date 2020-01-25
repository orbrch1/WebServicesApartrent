const mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        mongooseUniqueValidator = require('mongoose-unique-validator');

const schema = new Schema ({
    msgReceiver: {type: Schema.Types.ObjectId, ref: 'User' ,required:true, unique: true},
    msgSender: {type: Schema.Types.ObjectId, ref: 'User' ,required:true, unique: true},
    content: {type:String, required:true},
    currentDate: {type:Date, require:true}
     }, {
    collection: 'messages'
});

schema.plugin(mongooseUniqueValidator);

const Message = mongoose.model('Message', schema);

module.exports = Message;
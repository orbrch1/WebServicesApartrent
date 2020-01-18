const mongoose = require('mongoose');

const schema = new mongoose.Schema ({
name: {type:String, required:true},
gender: {type: String, enum: ['male','female'] ,required:true},
username: {type: String, required:true},
email: {type: String, required:true},
phone:{type: String, required:false},
//DateOfBirth: {type:Date, require: true},
numberOfRents: {type: Number, required:true}
}, {
    collection: 'users'
});

const User = mongoose.model('User', schema);


module.exports = User;

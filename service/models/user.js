const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    name: {type:String, required:true},
    gender: {type: String, enum: ['male','female'] ,required:true},
    username: {type: String, required:true},
    email: {type: String, required:true},
    phone:{type: String, required:false},
    registertionDate: {type: Date, require: true},
    //DateOfBirth: {type:Date, require: true},
    numberOfRents: {type: Number, required:true},
    discount: {type:Number, required:true} //to update the rest
    }, {
        collection: 'users'
    });

const User = mongoose.model('User', userSchema);

module.exports = User;

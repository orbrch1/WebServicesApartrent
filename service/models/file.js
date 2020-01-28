const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      mongooseUniqueValidator = require('mongoose-unique-validator');

const schema = new Schema ({

  apartment: {type: Schema.Types.ObjectId, ref: 'Apartment' ,required:true, unique: true},
  length : {type: Number, required:true},
  chunkSize : {type: Number, required:true},
  uploadDate : {type: timestamp, required:true},
  md5 : {type: Map, required: true},  //mongo type: hash
  filename : {type: String, required:true},
  contentType : {type: String, required:true},
  aliases :  {type: ArrayBuffer, required:true}, //mongo type: string array
  metadata : {type:ob}
}, {
    collection: 'files'
});

schema.plugin(mongooseUniqueValidator);

const File = mongoose.model('File', schema);

module.exports = File;
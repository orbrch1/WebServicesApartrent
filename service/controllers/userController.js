// const mongoose = require('mongoose');
// const mongodb = require('../database');

const User  = require('../models/user');

exports.userController = {
  getAllUsers(req, res, next) {
    let result = [];
    console.log("Receied a request...");
    User.find({})
      .then(docs => {
        console.log(docs);
        return res.json(docs);
      })
      .catch(err => console.log(`query error: ${err}`));
    // mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
    // .then(async() => {
    //   // const result = await User.find({})
    //   let result = [];
    //   if(result) res.json(result)
    //   else res.status(404).send('not found')
    // })
    // .catch(err => { 
    //   console.error('some error occurred', err)
    //   res.status(500).send(err.message)
    // });
  }
};

// for route /final-ideas/getAllIdeas
exports.getData = (req, res) => {
 Idea.find({})
   .then(docs => {
     console.log(docs);

     return res.json(docs);
   })
   .catch(err => console.log(`query error: ${err}`));
};

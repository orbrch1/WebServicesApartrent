const User  = require('../models/user');

const mongoose = require('mongoose');
const mongodb = require('../mongodb');

exports.userController = {
    getAllUsers(req, res, next) {
      mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
      .then(async() => {
        const result = await Order.find({})

        if(result) res.json(result)
        else res.status(404).send('not found')
      })
      .catch(err => { 
        console.error('some error occurred', err)
        res.status(500).send(err.message)
      });
    }
   };
const User  = require('../models/user');

const mongoose = require('mongoose');
const mongodb = require('../database');

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
   
    },
    
    getUserById(req, res, next) {
      mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
      .then(async() => {
        const {id = null} = req.params;
        const result = await User.findOne({_id: id});
  
        if(result) res.json(result)
        else res.status(404).send(`user with the id ${id} has not been found`);
      })
      .catch(err => {
        console.error('some error occurred', err);
        res.status(500).send(err.message);
      })
      },
      addUser(req, res, next) {
        console.log('new entity saved!');
        // const { body } = req;
        // restaurant.push(body);
        // res.send('new entity saved!');
  
        mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
          .then(async() => {
            const {
              id = null,
              name = null,
              gender = null,
              username = null,
              email = null,
              phone = null,
              numberOfRents = null,
              userId = null,
              }  = req.body;
            console.log("req.body");
            console.log(req.body);
            console.log(`id = ${id}, name = ${name}, gender = ${gender}, username = ${username}, email = ${email}, phone=${phone},numberOfRents=${numberOfRents}`);
            if(!(content == ' ' || content.length == 0 || FormData.connect.value =="" || content.length > 280))
            {
              const user = new User({id, name, userId, gender, username, email, phone, numberOfRents});
              console.log(user);
              const result = await user.save();
              console.log(result);
            }
            if(result) {
              res.json(result);
            }
            else {
              res.status(404).send('not found');
            }
          }).catch(err => {
            console.error("Some error occured", err);
            res.status(500).send(err);
          })
      },
      editUser(req,res,next){
        mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
        .then(async() => {
          const {id = null} = req.params;  
          const {userId = null, name = null, gender = null, username = null, email = null, phone = null, /*numberOfRents = null?? auto  */ } = req.body; // why null on edit and not restoring ?
          if(!(content == ' ' || content.length == 0 || content.length > 280)){
            const result = await User.updateOne({_id: id}, {userId, name, gender, username, email, phone, })   // _id with '_' because mongo generate it auto for us. format-> {generated id KEY : our id (null) VALUE, all the params to update}    
          }     
            
          if(result) res.json(result)
          else res.status(404).send(`user with the id ${id} has not been found`);
        })
        .catch(err => {
          console.error("Some error occured", err);
          res.status(500).send(err);
        })
      },
      removeUser(req,res,next){   
        mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
        .then(async() => {
  
          // const id = new mongoose.Types.ObjectID(req.body.id);
          const id = new mongoose.mongo.ObjectId(req.body.id);
          const result = await User.deleteOne({_id : id});
  
          if(result) res.json(result)
          else res.status(404).send(`user with the id ${id} has not been found`);
        })
        .catch(err => {
          console.error("Some error occured", err);
          res.status(500).send(err);
        })
      }
   };
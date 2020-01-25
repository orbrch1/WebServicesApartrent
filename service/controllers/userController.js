// const mongoose = require('mongoose');
// const mongodb = require('../database');

const User  = require('../models/user');

function ValidateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value))
    {
      return (true)
    }
      console.log("You have entered an invalid email address!")
      return (false)
}

function ValidatePhone(phone) {
  if ( /^\d{3}\-\d{7}$/.test(phone) || /^\d{7}\$/.test(phone) ||/^\d{3}\-\d{9}$/.test(phone) || /^\d{13}$/.test(phone))
    {
      return (true)
    }
      console.log("You have entered an invalid phone number!")
      return (false)
}

function ValidateName(name) {
  if(!(name == ' ' || name.length == 0 || FormData.name.value =="" || name.length < 2 || name.length < 20 ))
  {
    return (true)
  }
    console.log("You have entered an invalid name!")
    return (false)
}

// for route /final-ideas/getAllIdeas
exports.getData = (req, res) => {
  Idea.find({})
    .then(docs => {
      console.log(docs);
 
      return res.json(docs);
    })
    .catch(err => console.log(`query error: ${err}`));
 };
 
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
  },
  getUserById(req,res,next){
    mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
      .then(async() => {
        const{id = null} = req.params;
        const result = await User.findOne({_id: id});

        if(result) res.jason(result)
        else res.status(404).send(`user with the id ${id} has not beed found`);
      })
      .catch(err => {
        console.error('some error occurred', err);
        res.status(500).send(err.message);
      })
  },

  addUser(req,res,next) {
    console.log('new entity saved!');
    mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
    .then(async() => {
      const {
       //id = null,    <<-- auto generated ?
        name = null,
        gender = 'male',
        email = null,
        phone = null,
       // registertionDate =    <<-- current date
        numberOfRents = 0
      } = req.body;
      console.log("req.body");
      console.log(req.body);
      console.log(`id = ${id}, name = ${name}, gender = ${gender}, email = ${email}, phone = ${phone}, registertionDate = ${registertionDate}, numberOfRents = ${numberOfRents}`)
      
      if(ValidateEmail(email) && ValidatePhone(phone) && ValidateName(name))
      {  
        const user = new User({name, gender, email, phone, numberOfRents});
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
    }).catch(error => {
      console.error("Some error occured, filling details incorrectly", err);
      res.status(500).send(err);
    })
  },

  editUser(req,res,next){
    mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
    .then(async() => { 
      const {id = null} = req.params;
      const { 
        //id = null,    <<-- auto generated ?  allow editable ? (no)
         name = null,
         gender = 'male',
         email = null,
         phone = null,
        // registertionDate =    <<-- current date
         numberOfRents = 0
       } = req.body;
       if(ValidateEmail(email) && ValidatePhone(phone) && ValidateName(name)){
         const result = await User.updateOne({_id:id}, {name,gender,email,phone})
       }
      
       if(result) res.json(result)
       else res.status(404).send(`user with the id: ${id} has not been found`);
      })
      .catch(err => {
        console.error("Some error occured", err);
        res.status(500).send(err);
      })
    },
    removeUser(req,res,next){
      mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
        .then(async() => {
          const id = new mongoose.mongo.ObjectId(req.body.id);
          const result = await User.deleteOne({_id:id});

          if(result) res.json(result)
          else res.status(404).send(`user with the id: ${id} has not been found`);
        })
        .catch (err => { 
        console.error("Some error occured", err);
        res.status(500).send(err);
      })
    }
};

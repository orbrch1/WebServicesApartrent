const mongoose = require('mongoose');
const mongodb = require('../database');

const User  = require('../models/user');

function validateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value))
    {
      return (true)
    }
      console.log("You have entered an invalid email address!")
      return (false)
}

function validatePhone(phone) {
  if ( /^\d{3}\-\d{7}$/.test(phone) || /^\d{7}\$/.test(phone) ||/^\d{3}\-\d{9}$/.test(phone) || /^\d{13}$/.test(phone))
    {
      return (true)
    }
      console.log("You have entered an invalid phone number!")
      return (false)
}

function validateName(name) {
  if(!(name == ' ' || name.length == 0 || FormData.name.value =="" || name.length < 2 || name.length < 20 ))
  {
    return (true)
  }
    console.log("You have entered an invalid name!")
    return (false)
}
 
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

    let userIdAsObjectId = mongoose.Types.ObjectId(req.params.id);
    User.findOne({_id: userIdAsObjectId})
    .then(userResult => {
      // console.log(userResult);
      return res.json(userResult);
    })
    .catch(err => console.log(`query error: ${err}`));
  },

  getUserByUsername(req,res,next){

    let username = req.params.username;
    // let userIdAsObjectId = mongoose.Types.ObjectId(userId);
    User.findOne({username: username})
    .then(userResult => {
      // console.log(userResult);
      return res.json(userResult);
    })
    .catch(err => console.log(`query error: ${err}`));
  },

  addUser(req,res,next) {

      const {
        name = null,
        username = null,
        gender = 'male',
        email = null,
        phone = null,
       // registertionDate =    <<-- current date
      } = req.body;

    
    const user = new User({
      name: name,
      gender: gender,
      email: email,
      phone: phone,
      numberOfRents: 0,
      username: username,
      registertionDate: Date.now()
    });
    //if valid..
    user.save((err) => {
      if(err) throw err;
      console.log("User created!");
      res.json();
    });

    // console.log('new entity saved!');
    // mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
    // .then(async() => {
    //   const {
    //     name = null,
    //     gender = 'male',
    //     email = null,
    //     phone = null,
    //    // registertionDate =    <<-- current date
    //     numberOfRents = 0
    //   } = req.body;
    //   console.log("req.body");
    //   console.log(req.body);
    //   console.log(`id = ${id}, name = ${name}, gender = ${gender}, email = ${email}, phone = ${phone}, registertionDate = ${registertionDate}, numberOfRents = ${numberOfRents}`)
      
    //   if(validateEmail(email) && validatePhone(phone) && validateName(name))
    //   {  
    //     const user = new User({name, gender, email, phone, numberOfRents});
    //     console.log(user);
    //     const result = await user.save();
    //     console.log(result);
    //   }
    //   if(result) {
    //     res.json(result);
    //   }
    //   else {
    //     res.status(404).send('not found');
    //   }
    // }).catch(error => {
    //   console.error("Some error occured, filling details incorrectly", err);
    //   res.status(500).send(err);
    // })
  },

  editUser(req,res,next){

    let userIdAsObjectId = mongoose.Types.ObjectId(req.params.id);

    const {
      name = null,
      gender = null,
      email = null,
      phone = null,
    } = req.body;

    User.updateOne({ _id: userIdAsObjectId }, {
      name: name,
      gender: gender,
      email: email,
      phone: phone,
      },
      (err, result) => {
      if (err)
        throw err;
      console.log(`Saved user: ${JSON.stringify(result)}`);
      res.json();
    });

    // mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
    // .then(async() => { 
    //   const {id = null} = req.params;
    //   const { 
    //     //id = null,    <<-- auto generated ?  allow editable ? (no)
    //      name = null,
    //      gender = 'male',
    //      email = null,
    //      phone = null,
    //     // registertionDate =    <<-- current date
    //      numberOfRents = 0
    //    } = req.body;
    //    if(validateEmail(email) && validatePhone(phone) && validateName(name)){
    //      const result = await User.updateOne({_id:id}, {name,gender,email,phone})
    //    }
      
    //    if(result) res.json(result)
    //    else res.status(404).send(`user with the id: ${id} has not been found`);
    //   })
    //   .catch(err => {
    //     console.error("Some error occured", err);
    //     res.status(500).send(err);
    //   })
    },

    removeUser(req,res,next) {
      // console.log(req);
      let userId = req.params.id;
      // if(userId == null) res.status(404).send();
      const conditions = { _id: userId };
      User.deleteOne(conditions,(err, result) => {
        if (err)
          throw err;
        // console.log(result);
        if(result.deletedCount === 0) {
          res.status(404).send();
        }
        else {
          res.json();
        }
      });
      // mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
      //   .then(async() => {
      //     const id = new mongoose.mongo.ObjectId(req.body.id);
      //     const result = await User.deleteOne({_id:id});

      //     if(result) res.json(result)
      //     else res.status(404).send(`user with the id: ${id} has not been found`);
      //   })
      //   .catch (err => { 
      //   console.error("Some error occured", err);
      //   res.status(500).send(err);
      // })
    }
};

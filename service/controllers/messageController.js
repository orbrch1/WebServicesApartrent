const Message  = require('../models/message');
// const User = require('../models/user'); is needed ? 

const mongoose = require('mongoose');
const mongodb = require('../database');

function ValidateContent(content) {
    if(!(content == ' ' || content.length == 0 || FormData.content.value =="" || content.length < 10 || content.length > 200 ))
    {
      return (true)
    }
      console.log("You have entered an invalid content!")
      return (false)
  }
  
  function ValidateUser(user) {
    if(!(user == null ))
    {
      return (true)
    }
      console.log("User is missing to fill the review!")
      return (false)
  }
  
  exports.messageController = {
    getAllMessages(req, res, next) {
      let result = [];
      console.log("Received a request...");
      Message.find({})
      .then(docs =>{
        console.log(docs);
        return res.json(docs);
        })
        .catch(err => console.log(`query error: ${err}`));
    },
    getMessageById(req, res, next) {
      mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
      .then(async() => {
        const {id = null} = req.params;
        const result = await Message.findOne({_id: id});
  
        if(result) res.json(result)
        else res.status(404).send(`message with the id ${id} has not been found`);
      })
      .catch(err => {
        console.error('some error occurred', err);
        res.status(500).send(err.message);
      })
    },
    addMessage(req, res, next) {
      console.log('new entity saved!');
      // const { body } = req;
      // restaurant.push(body);
      // res.send('new entity saved!');

      mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
        .then(async() => {
          const {id = null,
            content = null,
            msgSender = null,
            msgReceiver = null,
            currentDate = new Date()
          } = req.body;
          console.log("req.body");
          console.log(req.body);
          console.log(`id = ${id}, content = ${content}, msgSender = ${msgSender}, msgReceiver = ${msgReceiver}, currentDate = ${currentDate}`);
          if(ValidateContent(content) && ValidateUser(msgSender) && ValidateUser(msgReceiver))
          {
            const message = new message({id, content, msgSender, msgReceiver, currentDate});
            console.log(message);
            const result = await message.save();
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
    editMessage(req,res,next){
      mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
      .then(async() => {
        const {id = null} = req.params;  
        const {msgSender = null, content = null, msgReceiver = null, currentDate = new Date()} = req.body;
        if(ValidateContent(content) && ValidateUser(msgSender) && ValidateUser(msgReceiver)){
          const result = await Message.updateOne({_id: id}, {msgReceiver, msgSender, content, currentDate})   // _id with '_' because mongo generate it auto for us. format-> {generated id KEY : our id (null) VALUE, all the params to update}    
        }     
          
        if(result) res.json(result)
        else res.status(404).send(`message with the id ${id} has not been found`);
      })
      .catch(err => {
        console.error("Some error occured", err);
        res.status(500).send(err);
      })
    },
    removeMessage(req,res,next){
      mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
      .then(async() => {

        // const id = new mongoose.Types.ObjectID(req.body.id);
        const id = new mongoose.mongo.ObjectId(req.body.id);
        const result = await Message.deleteOne({_id : id});

        if(result) res.json(result)
        else res.status(404).send(`message with the id ${id} has not been found`);
      })
      .catch(err => {
        console.error("Some error occured", err);
        res.status(500).send(err);
      })
    }

   };
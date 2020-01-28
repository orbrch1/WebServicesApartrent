const mongoose = require('mongoose');
const mongodb = require('../database');

const Message  = require('../models/message');

function validateContent(content) {
    if(!(content == ' ' || content.length == 0 || FormData.content.value =="" || content.length < 10 || content.length > 200 ))
    {
      return (true)
    }
      console.log("You have entered an invalid content!")
      return (false)
  }
  
  function validateUser(user) {
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
    getMessageByTenantId(req, res, next) {
    let userIdAsObjectId = mongoose.Types.ObjectId(req.params.id);
      Message.find({tenant: userIdAsObjectId})
      .then(messageResult => {
        // console.log(userResult);
        return res.json(messageResult);
      })
      .catch(err => console.log(`query error: ${err}`));
    },
    getMessageByLandlordId(req, res, next) {
      let userIdAsObjectId = mongoose.Types.ObjectId(req.params.id);
        Message.find({landLord: userIdAsObjectId})
        .then(messageResult => {
          // console.log(userResult);
          return res.json(messageResult);
        })
        .catch(err => console.log(`query error: ${err}`));
      },
    getMessageById(req, res, next) {
      let messageIdAsObjectId = mongoose.Types.ObjectId(req.params.id);
      Message.findOne({_id: messageIdAsObjectId})
      .then(userResult => {
      // console.log(userResult);
      return res.json(userResult);
    })
    .catch(err => console.log(`query error: ${err}`));
  },
    //   mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
    //   .then(async() => {
    //     const {id = null} = req.params;
    //     const result = await Message.findOne({_id: id});
  
    //     if(result) res.json(result)
    //     else res.status(404).send(`message with the id ${id} has not been found`);
    //   })
    //   .catch(err => {
    //     console.error('some error occurred', err);
    //     res.status(500).send(err.message);
    //   })
    // },

    addMessage(req, res, next) {
      console.log('new entity saved!');

      const {
        tenant = null,
        landLord = null,
        content = null
       // registertionDate =    <<-- current date
      } = req.body;
      const message = new Message({
      tenant: tenant,
      landLord: landLord,
      content: content,
      currentDate: Date.now()
    });
    message.save((err) => {
      if(err) throw err;
      console.log("New message created!");
      res.json();
    });
  },
    editMessage(req,res,next){
      let messageIdAsObjectId = mongoose.Types.ObjectId(req.params.id);

    const {
      tenant = null,
      landLord = null,
      content = null
    } = req.body;

    Message.updateOne({ _id: messageIdAsObjectId }, {
      tenant: tenant,
      landLord: landLord,
      content: content,
      currentDate: Date.now()
      },
      (err, result) => {
      if (err)
        throw err;
      console.log(`Saved message: ${JSON.stringify(result)}`);
      res.json();
    });
           
      // mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
      // .then(async() => {
      //   const {id = null} = req.params;  
      //   const {msgSender = null, content = null, msgReceiver = null, currentDate = new Date()} = req.body;
      //   if(ValidateContent(content) && ValidateUser(msgSender) && ValidateUser(msgReceiver)){
      //     const result = await Message.updateOne({_id: id}, {msgReceiver, msgSender, content, currentDate})   // _id with '_' because mongo generate it auto for us. format-> {generated id KEY : our id (null) VALUE, all the params to update}    
      //   }     
          
      //   if(result) res.json(result)
      //   else res.status(404).send(`message with the id ${id} has not been found`);
      // })
      // .catch(err => {
      //   console.error("Some error occured", err);
      //   res.status(500).send(err);
      // })
    },
    removeMessage(req,res,next){
      let messageId = req.params.id;
      // if(userId == null) res.status(404).send();
      const conditions = { _id: messageId };
      Message.deleteOne(conditions,(err, result) => {
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
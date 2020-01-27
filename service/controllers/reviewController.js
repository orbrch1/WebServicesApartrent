const Review  = require('../models/review');

const mongoose = require('mongoose');
const mongodb = require('../database');
let dateNow = new Date();

function validateContent(content) {
  if(!(content == ' ' || content.length == 0 || FormData.content.value =="" || content.length < 2 || content.length > 20 ))
  {
    return (true)
  }
    console.log("You have entered an invalid content!")
    return (false)
}

function validateLevels(levels) {
  if(!(levels < 1 || levels> 5 ))
  {
    return (true)
  }
    console.log("You have entered an invalid levels!")
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

exports.reviewController = {
  //Views
  getAllReviews(req, res, next) {
    let result = [];
    console.log("Received a request...");
    Review.find({})
    .then(docs =>{
      console.log(docs);
      return res.json(docs);
      })
      .catch(err => console.log(`query error: ${err}`));
  },

  //Apartment Reviews
  getReviewByApartment(req, res, next) {
    mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
    .then(async() => {
      const {id = null} = req.params;
      const result = await Review.findOne({apartment: id});

      if(result) res.json(result)
      else res.status(404).send(`review with the id ${id} has not been found`);
    })
    .catch(err => {
      console.error('some error occurred', err);
      res.status(500).send(err.message);
    })
  },

 

  addReview(req, res, next) {
    console.log('new entity saved!');
    // const { body } = req;
    // restaurant.push(body);
    // res.send('new entity saved!');

    mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
      .then(async() => {
        const {
          content = null,
          user = null,
          levels = null,
          currentDate = dateNow.now(),
          apartment=null
        } = req.body;
        console.log("req.body");
        console.log(req.body);
        console.log(`id = ${id}, content = ${content}, user = ${user}, levels = ${levels}, currentDate = ${currentDate},apartment= ${apartment}`);
        if(validateContent(content) && validateUser(user) && validateLevels(levels))
        {
          const review = new Review({id, content, user, levels});
          console.log(review);
          const result = await review.save();
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
  editReview(req,res,next){
    mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
    .then(async() => {
      const {id = null} = req.params;  
      const { content = null, levels = null,currentDate = dateNow.now()} = req.body; // null or existed value ?
      if(validateLevels(levels) && validateContent(content) && validateUser(user)){
        const result = await Review.updateOne({_id: id}, {user, content, levels})  
      }     
        
      if(result) res.json(result)
      else res.status(404).send(`review with the id ${id} has not been found`);
    })
    .catch(err => {
      console.error("Some error occured", err);
      res.status(500).send(err);
    })
  },
  removeReview(req,res,next){
    mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
    .then(async() => {

      // const id = new mongoose.Types.ObjectID(req.body.id);
      const id = new mongoose.mongo.ObjectId(req.body.id);
      const result = await Review.deleteOne({_id : id});

      if(result) res.json(result)
      else res.status(404).send(`review with the id ${id} has not been found`);
    })
    .catch(err => {
      console.error("Some error occured", err);
      res.status(500).send(err);
    })
  }

};
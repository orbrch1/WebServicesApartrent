const Review  = require('../models/review');

const mongoose = require('mongoose');
const mongodb = require('../database');

exports.reviewController = {
    getAllReviews(req, res, next) {
      mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
      .then(async() => {
        const result = await Review.find({})

        if(result) res.json(result)
        else res.status(404).send('not found')
      })
      .catch(err => { 
        console.error('some error occurred', err)
        res.status(500).send(err.message)
      });
    },
    getReviewById(req, res, next) {
    mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
    .then(async() => {
      const {id = null} = req.params;
      const result = await Review.findOne({_id: id});

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
            id = null, // needed ???
            content = null,
            user = null,
            levels = null
            
          } = req.body;
          console.log("req.body");
          console.log(req.body);
          console.log(`id = ${id}, content = ${content}, user = ${user}, levels = ${levels}`);
          if(!(content == ' ' || content.length == 0 || FormData.connect.value =="" || content.length > 280))
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
        const {user = null, content = null, levels = null} = req.body;
        if(!(content == ' ' || content.length == 0 || content.length > 280)){
          const result = await Review.updateOne({_id: id}, {user, content, levels})   // _id with '_' because mongo generate it auto for us. format-> {generated id KEY : our id (null) VALUE, all the params to update}    
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
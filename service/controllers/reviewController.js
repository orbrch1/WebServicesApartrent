
const Review  = require('../models/review');

const mongoose = require('mongoose');
const mongodb = require('../database');
//let dateNow = new Date();

// function validateContent(content) {
//   if(!(content == ' ' || content.length == 0 || FormData.content.value =="" || content.length < 2 || content.length > 20 ))
//   {
//     return (true)
//   }
//     console.log("You have entered an invalid content!")
//     return (false)
// }

// function validateLevels(levels) {
//   if(!(levels < 1 || levels> 5 ))
//   {
//     return (true)
//   }
//     console.log("You have entered an invalid levels!")
//     return (false)
// }

// function validateUser(user) {
//   if(!(user == null ))
//   {
//     return (true)
//   }
//     console.log("User is missing to fill the review!")
//     return (false)
// }

exports.reviewController = {
  getAllReviews(req, res, next) {
    let result = [];
    console.log("Receied a request...");
    Review.find({})
      .then(docs => {
      console.log(docs);
      return res.json(docs);
    })
      .catch(err => console.log(`query error: ${err}`));
  },
  getReviewById(req,res,next){
    let ReviewIdAsObjectId = mongoose.Types.ObjectId(req.params.id);
    Review.findOne({_id: ReviewIdAsObjectId})
    .then(ReviewResult => {
      // console.log(userResult);
      return res.json(ReviewResult);
    })
    .catch(err => console.log(`query error: ${err}`));

  },
  addReview(req,res,next){
    const {
      content = null,
      user = null,
      levels = null,
      apartment= null,
      currentDate = null
    } = req.body;

  
  const Review = new User({
    content: content,
    user: user,
    levels: levels,
    currentDate:  Date.now(),
    apartment: apartment
  });
  //if valid..
  Review.save((err) => {
    if(err) throw err;
    console.log("Order created!");
    res.json();
  });

  },
  editReview(req,res,next){
    let ReviewIdAsObjectId = mongoose.Types.ObjectId(req.params.id);
    const {
      content = null,
      user = null,
      levels = null,
      apartment=null
    } = req.body;

    Review.updateOne({ _id: ReviewIdAsObjectId }, {
      content: content,
      user: user,
      levels: levels,
      currentDate: Date.now(),
      apartment: apartment
      },
      (err, result) => {
      if (err)
        throw err;
      console.log(`Saved Review: ${JSON.stringify(result)}`);
      res.json();
    });
  },

  removeReview(req,res,next){
       // console.log(req);
       let ReviewId = req.params.id;
       // if(userId == null) res.status(404).send();
       const conditions = { _id: ReviewId };
       Review.deleteOne(conditions,(err, result) => {
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

  }
}
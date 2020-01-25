const Apartment  = require('../models/apartment');

const mongoose = require('mongoose');
const mongodb = require('../database');

function ValidateNumOfRooms(NumberOfRooms) {
  if(!(NumberOfRooms < 1 || FormData.NumberOfRooms.value =="" || NumberOfRooms > 20 ))
  {
    return (true)
  }
    console.log("You have entered an invalid number Of rooms!")
    return (false)
}

function ValidateCoordinate(coordinate) {
  if(!(coordinate == ' ' || coordinate.length == 0 || FormData.coordinate.value =="" || 
  /^([-+]?)([\d]{1,2})(((\.)(\d+)(,)))(\s*)(([-+]?)([\d]{1,3})((\.)(\d+))?)$/.test(coordinate)))
  {
    return (true)
  }
    console.log("You got bad coordinates!")
    return (false)
}

function ValidatePricePerDay(PricePerDay) {
  if(!(PricePerDay < 1 || FormData.NumberOfRooms.value =="" || PricePerDay > 10000 ))
  {
    return (true)
  }
    console.log("You have entered an invalid price per day!")
    return (false)
}


exports.apartmentController = {
    getAllApartments(req, res, next) {
      mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
      .then(async() => {
        const result = await Apartment.find({})

        if(result) res.json(result)
        else res.status(404).send('not found')
      })
      .catch(err => { 
        console.error('some error occurred', err)
        res.status(500).send(err.message)
      });
    },
    getApartmentById(req, res, next) {
    mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
    .then(async() => {
      const {id = null} = req.params;
      const result = await Apartment.findOne({_id: id});

      if(result) res.json(result)
      else res.status(404).send(`apartment with the id ${id} has not been found`);
    })
    .catch(err => {
      console.error('some error occurred', err);
      res.status(500).send(err.message);
    })
    },
    addapartment(req, res, next) {
      console.log('new entity saved!');
      // const { body } = req;
      // restaurant.push(body);
      // res.send('new entity saved!');

      mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
        .then(async() => {
          const {
            id = null,
            content = null,
            userId = null,
            parentReviewId = null
          } = req.body;
          console.log("req.body");
          console.log(req.body);
          console.log(`id = ${id}, content = ${content}, userId = ${userId}, parentReviewId = ${parentReviewId}`);
          if(!(content == ' ' || content.length == 0 || FormData.connect.value =="" || content.length > 280))
          {
            const apartment = new Apartment({id, content, userId, parentReviewId});
            console.log(apartment);
            const result = await apartment.save();
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
    editApartment(req,res,next){
      mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
      .then(async() => {
        const {id = null} = req.params;  
        const {userId = null, content = null, parentReviewtId = null} = req.body;
        if(!(content == ' ' || content.length == 0 || content.length > 280)){
          const result = await Aapartment.updateOne({_id: id}, {userId, content, parentReviewId})   // _id with '_' because mongo generate it auto for us. format-> {generated id KEY : our id (null) VALUE, all the params to update}    
        }     
          
        if(result) res.json(result)
        else res.status(404).send(`review with the id ${id} has not been found`);
      })
      .catch(err => {
        console.error("Some error occured", err);
        res.status(500).send(err);
      })
    },
    removeApartment(req,res,next){
      mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
      .then(async() => {

        // const id = new mongoose.Types.ObjectID(req.body.id);
        const id = new mongoose.mongo.ObjectId(req.body.id);
        const result = await Apartment.deleteOne({_id : id});

        if(result) res.json(result)
        else res.status(404).send(`apartment with the id ${id} has not been found`);
      })
      .catch(err => {
        console.error("Some error occured", err);
        res.status(500).send(err);
      })
    }

   };
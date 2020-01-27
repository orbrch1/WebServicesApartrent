const Apartment  = require('../models/apartment');

const mongoose = require('mongoose');
const mongodb = require('../database');

function validateNumOfRooms(NumberOfRooms) {
  if(!(NumberOfRooms < 1 || FormData.NumberOfRooms.value =="" || NumberOfRooms > 20 ))
  {
    return (true)
  }
    console.log("You have entered an invalid number Of rooms!")
    return (false)
}

function validateCoordinate(coordinate) {
  if(!(coordinate == ' ' || coordinate.length == 0 || FormData.coordinate.value =="" || 
  /^([-+]?)([\d]{1,2})(((\.)(\d+)(,)))(\s*)(([-+]?)([\d]{1,3})((\.)(\d+))?)$/.test(coordinate)))
  {
    return (true)
  }
    console.log("You got bad coordinates!")
    return (false)
}

function validatePricePerDay(PricePerDay) {
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

    getApartmentsByUserId(req,res,next) {
      // let userIdAsObjectId = mongoose.Types.ObjectId(req.params.id);
      // User.findOne({_id: userIdAsObjectId})
      // .then(userResult => {
      //   // console.log(userResult);
      //   return res.json(userResult);
      // })
      // .catch(err => console.log(`query error: ${err}`));
    },
    getApartmentByUserId(req, res, next) {
      let userIdAsObjectId = mongoose.Types.ObjectId(req.params.id);
      Apartment.find({landLord: userIdAsObjectId})
      .then(apartmentResult => {
        // console.log(userResult);
        return res.json(apartmentResult);
      })
      .catch(err => console.log(`query error: ${err}`));
    },
      addApartment(req,res,next) {
        const {
          landLord = null,
          coordinate = null,    
          apartmentNumber = null,
          numberOfRooms = 0,
          numberOfBeds = 0,
          isFurnished = false,
          numOfParking = null,
          hasAC = false,
          inUse = false
        } = req.body;
  
      
      const apartment = new Apartment({
        landLord: landLord,
        coordinate: coordinate,
        apartmentNumber: apartmentNumber,
        numberOfRooms: numberOfRooms,
        numberOfBeds: numberOfBeds,
        isFurnished: isFurnished,
        numOfParking: numOfParking,
        hasAC: hasAC,
        inUse: inUse,
        registertionDate: Date.now()
      });
      //if valid..
      apartment.save((err) => {
        if(err) throw err;
        console.log("Apartment created!");
        res.json();
      });
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
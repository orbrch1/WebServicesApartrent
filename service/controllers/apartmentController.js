const Apartment  = require('../models/apartment');

const mongoose = require('mongoose');
const mongodb = require('../database');

function validateNumOfRooms(numberOfRooms) {
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
    getApartmentById(req, res, next) {
      let apartmentIdAsObjectId = mongoose.Types.ObjectId(req.params.id);
      Apartment.findOne({_id: apartmentIdAsObjectId})
      .then(apartmentResult => {
        // console.log(userResult);
        return res.json(apartmentResult);
      })
      .catch(err => console.log(`query error: ${err}`));
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
      //if(validateNumOfRooms(numberOfRooms))
      apartment.save((err) => {
        if(err) throw err;
        console.log("Apartment created!");
        res.json();
      });
    },
    editApartment(req,res,next){
      let apartmentIdAsObjectId = mongoose.Types.ObjectId(req.params.id);

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

      Apartment.updateOne({_id:apartmentIdAsObjectId }, {
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
   //   if(validateNumOfRooms(numberOfRooms))
      apartment.save((err) => {
        if(err) throw err;
        console.log("Apartment created!");
        console.log(`Saved apartment: ${JSON.stringify(result)}`)
        res.json();
      });
    },
    removeApartment(req,res,next){
      // console.log(req);
      let apartmentId = req.params.id;
      // if(userId == null) res.status(404).send();
      const conditions = { _id: apartmentId };
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
    //   mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
    //   .then(async() => {

    //     // const id = new mongoose.Types.ObjectID(req.body.id);
    //     const id = new mongoose.mongo.ObjectId(req.body.id);
    //     const result = await Apartment.deleteOne({_id : id});

    //     if(result) res.json(result)
    //     else res.status(404).send(`apartment with the id ${id} has not been found`);
    //   })
    //   .catch(err => {
    //     console.error("Some error occured", err);
    //     res.status(500).send(err);
    //   })
    // }
    }
   };
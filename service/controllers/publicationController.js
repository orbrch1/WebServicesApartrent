const mongoose = require('mongoose');
const mongodb = require('../database');

const Publication  = require('../models/publication');

  function validateUser(user) {
    if(!(user == null ))
    {
      return (true)
    }
      console.log("User is missing to fill the review!")
      return (false)
  }
  
  exports.publicationController = {
    getAllPublications(req, res, next) {
      let result = [];
      console.log("Received a request...");
      Publication.find({})
      .then(docs =>{
        console.log(docs);
        return res.json(docs);
        })
        .catch(err => console.log(`query error: ${err}`));
    },
    getPublicationByApartmentId(req, res,next) {     
      let apartmentIdAsObjectId = mongoose.Types.ObjectId(req.params.id);
      Publication.find({apartment: apartmentIdAsObjectId})
      .then(publicationResult => {
        // console.log(userResult);
        return res.json(publicationResult);
      })
      .catch(err => console.log(`query error: ${err}`));
    },
    getPublicationByUserId(req, res,next) {   
    let userIdAsObjectId = mongoose.Types.ObjectId(req.params.id);
    Publication.findOne({landLord: userIdAsObjectId})
    .then(publicationResult => {
      // console.log(userResult);
      return res.json(publicationResult);
    })
    .catch(err => console.log(`query error: ${err}`));
  },

    getPublicationById(req, res, next) {             //get single publication by publication's id
      let publicationIdAsObjectId = mongoose.Types.ObjectId(req.params.id);
      Publication.findOne({_id: publicationIdAsObjectId})
      .then(userResult => {
      // console.log(userResult);
      return res.json(userResult);
    })
    .catch(err => console.log(`query error: ${err}`));
  },
  addPublication(req, res, next) {
    console.log('new entity saved!');
    const {
        apartment = null,
        startDate = null,
        endDate = null,
        pricePerDay = null,
        // registertionDate =    <<-- current date
        } = req.body;
        const publication = new Publication({
        apartment: apartment,
        startDate: startDate,
        endDate: endDate,
        pricePerDay: pricePerDay,
        currentDate: Date.now()
    });
    publication.save((err) => {
      if(err) throw err;
      console.log("New publication created!");
      res.json();
    });
  },
    editPublication(req,res,next){
      let publicationIdAsObjectId = mongoose.Types.ObjectId(req.params.id);

    const {
      apartment = null,
      startDate = null,
      endDate = null,
      pricePerDay = null
    } = req.body;

    Publication.updateOne({ _id: publicationIdAsObjectId }, {
      tenant: tenant,
      landLord: landLord,
      startDate: startDate,
      endDate: endDate,
      pricePerDay: pricePerDay,
      currentDate: Date.now()
      },
      (err, result) => {
      if (err)
        throw err;
      console.log(`Saved publication: ${JSON.stringify(result)}`);
      res.json();
    });
    },
    removePublication(req,res,next){
      let ublicationId = req.params.id;
      // if(userId == null) res.status(404).send();
      const conditions = { _id: ublicationId };
      Publication.deleteOne(conditions,(err, result) => {
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
        const result = await Publication.deleteOne({_id : id});

        if(result) res.json(result)
        else res.status(404).send(`publication with the id ${id} has not been found`);
      })
      .catch(err => {
        console.error("Some error occured", err);
        res.status(500).send(err);
      })
    }
   };
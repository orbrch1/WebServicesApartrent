const Offer  = require('../models/offer');
const mongoose = require('mongoose');
const mongodb = require('../database');
let dateNow = new Date();

// function validateDates(tenantStartDate, tenantEndDate, landLordStartDate, landLordEndDate, currentDate) {    
//     //if(/^(\d{4})-(\d{1,2})-(\d{1,2})$/.test(tenantStartDate))   is validation needed ? since date is a type
//     //  name == ' ' || name.length == 0 || FormData.name.value =="" ||  )) 
//     if(!(Math.abs(tenantStartDate-landLordStartDate) < 0 || 
//         Math.abs(tenantEndDate - landLordEndDate) > 0 || Math.abs(landLordEndDate - currentDate) < 0))    
//         {
//       return (true)
//     }
//       console.log("You have entered an invalid dates!")
//       return (false)
//   }

function validateUser(user) {
    if(!(user == null ))
    {
        return (true)
    }
    console.log("User is missing!")
    return (false)
}

exports.offerController ={
  getAllOffers(req,res,next){
    let result = [];
    console.log("Receied a request...");
    Offer.find({})
      .then(docs => {
        console.log(docs);
        return res.json(docs);
      })
      .catch(err => console.log(`query error: ${err}`));
  },
  getOfferById(req,res,next){
    let OfferIdAsObjectId = mongoose.Types.ObjectId(req.params.id);
    Offer.findOne({_id: OfferIdAsObjectId})
    .then(OfferResult => {
      // console.log(userResult);
      return res.json(OfferResult);
    })
    .catch(err => console.log(`query error: ${err}`));
  },
  getOfferByUserId(req,res,next){
    let userIdAsObjectId = mongoose.Types.ObjectId(req.params.id);
    Offer.find({tenant: userIdAsObjectId})
    .then(OfferResult => {
      // console.log(userResult);
      return res.json(OfferResult);
    })
    .catch(err => console.log(`query error: ${err}`));
  },
  addOffer(req,res,next){
    const {
      tenant = null,
      tenantStartDate = null,
      tenantEndDate = null,
      apartment=null
    } = req.body;
  
  const Offer = new Offer({
    tenant: tenant,
    tenantStartDate: tenantStartDate,
    tenantEndDate:  tenantEndDate,
    apartment: apartment,
    currentDate: Date.now()
  });
  //if valid..
  Offer.save((err) => {
    if(err) throw err;
    console.log("Offer created!");
    res.json();
  });

  },
  editOffer(req,res,next){
    let OfferIdAsObjectId = mongoose.Types.ObjectId(req.params.id);
    const {
      tenant = null,
      tenantStartDate = null,
      tenantEndDate = null,
      apartment = null
    } = req.body;

    Offer.updateOne({ _id: OfferIdAsObjectId }, {
      tenant: tenant,
      tenantStartDate: tenantStartDate,
      tenantEndDate:  tenantEndDate,
      apartment: apartment,
      currentDate: Date.now()
      },
      (err, result) => {
      if (err)
        throw err;
      console.log(`Saved Offer: ${JSON.stringify(result)}`);
      res.json();
    });
  },
  removeOffer(req,res,next){
    // console.log(req);
    let OfferId = req.params.id;
    // if(userId == null) res.status(404).send();
    const conditions = { _id: OfferId };
    Offer.deleteOne(conditions,(err, result) => {
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
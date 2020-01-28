const Order  = require('../models/order');

const mongoose = require('mongoose');
const mongodb = require('../database');

// function validateUser(user) {
//   if(!(user == null ))
//   {
//     return (true)
//   }
//     console.log("User is missing to fill the review!")
//     return (false)
// }

function calcTotalPrice(tenantStartDate, tenantEndDate, pricePerDay, discount)
 {
   const amountToPay = math(tenantStartDate - tenantEndDate) * pricePerDay * (1 - discount)
     return (amountToPay);
 }

exports.orderController ={
  getAllOrders(req,res,next){
    let result = [];
    console.log("Receied a request...");
    Order.find({})
      .then(docs => {
        console.log(docs);
        return res.json(docs);
      })
      .catch(err => console.log(`query error: ${err}`));
  },
  getAllOrdersByLandlord(req,res,next){
    let landlordIdAsObjectId = mongoose.Types.ObjectId(req.params.id);
      Order.find({landLord: landlordIdAsObjectId})
      .then(orderResult => {
        // console.log(userResult);
        return res.json(orderResult);
      })
  },
  getAllOrdersByTenant(req,res,next){
    let tenantIdAsObjectId = mongoose.Types.ObjectId(req.params.id);
      Order.find({landLord: tenantIdAsObjectId})
      .then(orderResult => {
        // console.log(userResult);
        return res.json(orderResult);
      })
  },
  getOrderById(req,res,next){
    let orderIdAsObjectId = mongoose.Types.ObjectId(req.params.id);
    Order.findOne({_id: orderIdAsObjectId})
    .then(orderResult => {
      // console.log(userResult);
      return res.json(orderResult);
    })
    .catch(err => console.log(`query error: ${err}`));
  },
  addOrder(req,res,next){
    const {
      landLord = null,
      tenant = null,
      tenantStartDate= null,
      pricePerDay =null,
      tenantEndDate = null,
      totalPrice = null,
      discount= null,
      approvedOfferDate = null
     // registertionDate =    <<-- current date
    } = req.body;

    // if(validateUser(tenant) && validateUser(landLord))
    // {
    //   amountToPay = calcAmountToPay(tenantStartDate, tenantEndDate, pricePerDay,discount );   //is the right way ?
    //   const order = new Order({id, landLord, tenant, amountToPay});
      
    //   numberOfRents++;
    //   console.log(order);
    //   const result = await order.save();
    //   console.log(result);
    // }
  totalPrice = calcTotalPrice(tenantStartDate, tenantEndDate, pricePerDay, discount);
  const Order = new Order({
    landLord: landLord,
    tenant: tenant,
    tenantStartDate: tenantStartDate,
    tenantEndDate: tenantEndDate,
    discount:discount,
    pricePerDay: pricePerDay,
    totalPrice: totalPrice,
    approvedOffer: Date.now() 
  });
  //if valid..
  Order.save((err) => {
    if(err) throw err;
    console.log("Order created!");
    res.json();
  });

  },
  editOrder(req,res,next){
    let orderIdAsObjectId = mongoose.Types.ObjectId(req.params.id);
    const {
      landLord = null,
      tenant = null,
      tenantStartDate= null,
      pricePerDay =null,
      tenantEndDate = null,
      amountToPay = null,
      discount= null,
      approvedOffer=null
    } = req.body;

    Order.updateOne({ _id: orderIdAsObjectId }, {
      landLord: landLord,
      tenant: tenant,
      tenantStartDate: tenantStartDate,
      pricePerDay: pricePerDay,
      tenantEndDate: tenantEndDate,
      amountToPay: amountToPay,
      discount:discount,
      approvedOffer:dateNow
      },
      (err, result) => {
      if (err)
        throw err;
      console.log(`Saved order: ${JSON.stringify(result)}`);
      res.json();
    });
  },

  removeOrder(req,res,next){
       // console.log(req);
       let orderId = req.params.id;
       // if(userId == null) res.status(404).send();
       const conditions = { _id: orderId };
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

  }
}

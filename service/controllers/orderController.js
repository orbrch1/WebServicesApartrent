const Order  = require('../models/order');

const mongoose = require('mongoose');
const mongodb = require('../database');

function ValidateUser(user) {
  if(!(user == null ))
  {
    return (true)
  }
    console.log("User is missing to fill the review!")
    return (false)
}

function calcAmountToPay(tenantStartDate, tenantEndDate, pricePerDay, numberOfRents)
{
  if(numberOfRents >= 0) {
    const amountToPay = math(tenantStartDate - tenantEndDate) * pricePerDay * (1 - discount)
    return (amountToPay);
  }
    console.log("Something is wrong with number of rents")
    return (false)
}

exports.orderController = {
  getAllOrders(req, res, next) {
    mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
    .then(async() => {
      const result = await Order.find({})

      if(result) res.json(result)
      else res.status(404).send('not found')
    })
    .catch(err => { 
      console.error('some error occurred', err)
      res.status(500).send(err.message)
    });
  },
    
  getOrderById(req, res, next) {
    mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
    .then(async() => {
      const {id = null} = req.params;
      const result = await User.findOne({_id: id});

      if(result) res.json(result)
      else res.status(404).send(`order with the id ${id} has not been found`);
    })
    .catch(err => {
      console.error('some error occurred', err);
      res.status(500).send(err.message);
    })
  },
  addOrder(req, res, next) {     ///<<-- it's generated by drawing details from landlord, tenant, apartment, BI
    console.log('new entity saved!');
    // const { body } = req;
    // restaurant.push(body);
    // res.send('new entity saved!');

    mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
      .then(async() => {
        const {
          landLord = null,
          tenant = null,
          amountToPay = null
          }  = req.body;
        console.log("req.body");
        console.log(req.body);
        console.log(`id = ${id}, landLord = ${landLord}, tenant = ${tenant}, amountToPay = ${amountToPay} `);
        if(ValidateUser(tenant) && ValidateUser(landLord))
        {
          amountToPay = calcAmountToPay(tenantStartDate, tenantEndDate, pricePerDay, numberOfRents);   //is the right way ?
          const order = new Order({id, landLord, tenant, amountToPay});
          console.log(order);
          const result = await order.save();
          console.log(result);
        }
        if(result) {
          res.json(result);
        }
        else {
          res.status(404).send('not found');
        }
      }).catch(err => {
        console.error("Some error occured, filling order incorrectly", err);
        res.status(500).send(err);
      })
  },
  editOrder(req,res,next){   // is needed ? since it's auto generated
    mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
    .then(async() => {
      const {id = null} = req.params;  
      const {landLord = null, name = null, tenant = null, amountToPay = null, email = null, phone = null, /*numberOfRents = null?? auto  */ } = req.body; // why null on edit and not restoring ?
      if(ValidateUser(tenant) && ValidateUser(landLord)){
        // pricePerDay = ?  needs to import from apartment ?
        amountToPay = calcAmountToPay(tenantStartDate, tenantEndDate, pricePerDay, numberOfRents);
        const result = await Order.updateOne({_id: id}, {landLord, tenant, tenantStartDate, tenantEndDate, amountToPay})   // amountToPay needs to be updated
      }     
        
      if(result) res.json(result)
      else res.status(404).send(`order with the id ${id} has not been found`);
    })
    .catch(err => {
      console.error("Some error occured", err);
      res.status(500).send(err);
    });
  },
  removeOrder(req,res,next){  //what is the concept meaning of this ?   
    mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
    .then(async() => {

      // const id = new mongoose.Types.ObjectID(req.body.id);
      const id = new mongoose.mongo.ObjectId(req.body.id);
      const result = await Order.deleteOne({_id : id});
      console.error("Order has been deleted", err);
      if(result) res.json(result)
      else res.status(404).send(`order with the id ${id} has not been found`);
    })
    .catch(err => {
      console.error("Some error occured", err);
      res.status(500).send(err);
    })
  }
 };

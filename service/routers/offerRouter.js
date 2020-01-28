const { Router } = require('express');
const {
    offerController
} = require('../controllers/offerController');

const offerRouter = new Router();

offerRouter.get('/getAllOffers', offerController.getAllOffers);
offerRouter.get('/', offerController.getAllOffers);
offerRouter.get('/id/:id', offerController.getOfferById);
offerRouter.get('/user/:id', offerController.getOfferByUserId);
offerRouter.post('/', offerController.addOffer);
offerRouter.put('/:id', offerController.editOffer);
offerRouter.delete('/:id', offerController.removeOffer);

module.exports = {
    offerRouter,
};
   
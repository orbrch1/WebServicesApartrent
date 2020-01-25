const { Router } = require('express');
const {
    offerController
} = require('../controllers/reviewController');

const reviewRouter = new Router();

offerRouter.get('/offer/getAllOffers', offerController.getAllOffers);
offerRouter.get('/offer/', offerController.getAllOffers);
offerRouter.get('/offer/:id', offerController.getOfferById);
offerRouter.post('/offer/', offerController.addOffer);
offerRouter.put('/offer/:id', offerController.editOffer);
offerRouter.delete('/offer/:id', offerController.removeOffer);

// //settings
// orderRouter.get('/:id', reviewController.get);
// orderRouter.post('/', orderController.post);
// orderRouter.put('/:id', orderController.put);
// orderRouter.delete('/:id', orderController.delete);

module.exports = {
    offerRouter,
};
   
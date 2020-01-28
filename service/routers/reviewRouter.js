const { Router } = require('express');
const {
    reviewController
} = require('../controllers/reviewController');

const reviewRouter = new Router();

reviewRouter.get('/getAllReviews', reviewController.getAllReviews);
reviewRouter.get('/', reviewController.getAllReviews);
reviewRouter.get('/:id', reviewController.getReviewById);
reviewRouter.post('/', reviewController.addReview);
reviewRouter.put('/:id', reviewController.editReview);
reviewRouter.delete('/:id', reviewController.removeReview);

// //settings
// orderRouter.get('/:id', reviewController.get);
// orderRouter.post('/', orderController.post);
// orderRouter.put('/:id', orderController.put);
// orderRouter.delete('/:id', orderController.delete);

module.exports = {
    reviewRouter,
};
   
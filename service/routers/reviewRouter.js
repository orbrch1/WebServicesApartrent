const { Router } = require('express');
const {
    reviewController
} = require('../controllers/reviewController');

const reviewRouter = new Router();

reviewRouter.get('/review/getAllReviews', reviewController.getAllReviews);
reviewRouter.get('/review/', reviewController.getAllReviews);
reviewRouter.get('/review/:id', reviewController.getReviewById);
reviewRouter.post('/review/', reviewController.addReview);
reviewRouter.put('/review/:id', reviewController.editReview);
reviewRouter.delete('/review/:id', reviewController.removeReview);

// //settings
// orderRouter.get('/:id', reviewController.get);
// orderRouter.post('/', orderController.post);
// orderRouter.put('/:id', orderController.put);
// orderRouter.delete('/:id', orderController.delete);

module.exports = {
    reviewRouter,
};
   
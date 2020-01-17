const { Router } = require('express');
const {
    reviewController
} = require('../controllers/reviewController');

const reviewRouter = new Router();

reviewRouter.get('/all', reviewController.getAllReviews);
reviewRouter.get('/', reviewController.getAllReviews);
// reviewRouter.get('/:id', reviewController.getReviewById);
// reviewRouter.post('/', reviewController.addReview);
// reviewRouter.put('/:id', reviewController.editReview);
// reviewRouter.delete('/:id', reviewController.removeReview);
// userRouter.get('/:id', userController.get);
// userRouter.post('/', userController.post);
// userRouter.put('/:id', userController.put);

// //settings
// orderRouter.get('/:id', orderController.get);
// orderRouter.post('/', orderController.post);
// orderRouter.put('/:id', orderController.put);
// orderRouter.delete('/:id', orderController.delete);

module.exports = {
    reviewRouter,
};
   
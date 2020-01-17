const { Router } = require('express');
const {
    orderController
} = require('../controllers/orderController');

const orderRouter = new Router();

orderRouter.get('/all', orderController.getAllOrders);
orderRouter.get('/', orderController.getAllOrders);
// orderRouter.get('/:id', orderRouter.getOrderById);
// orderRouter.post('/', orderRouter.addOrder);
// orderRouter.put('/:id', orderRouter.editOrder);
// orderRouter.delete('/:id', orderRouter.removeOrder);
// userRouter.get('/:id', userController.get);
// userRouter.post('/', userController.post);
// userRouter.put('/:id', userController.put);

// //settings
// orderRouter.get('/:id', orderController.get);
// orderRouter.post('/', orderController.post);
// orderRouter.put('/:id', orderController.put);
// orderRouter.delete('/:id', orderController.delete);

module.exports = {
    orderRouter,
};
   
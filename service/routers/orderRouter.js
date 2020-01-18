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

module.exports = {
    orderRouter,
};
   
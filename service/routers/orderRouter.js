const { Router } = require('express');
const {
    orderController
} = require('../controllers/orderController');

const orderRouter = new Router();

orderRouter.get('/getAllOrders', orderController.getAllOrders);
orderRouter.get('/', orderController.getAllOrders);
orderRouter.get('/tenant/:id', orderController.getAllOrdersByTenant);
orderRouter.get('/landlord/:id', orderController.getAllOrdersByLandlord);
orderRouter.get('/:id', orderController.getOrderById);
orderRouter.post('/', orderController.addOrder);
orderRouter.put('/:id', orderController.editOrder);
orderRouter.delete('/:id', orderController.removeOrder);

module.exports = {
    orderRouter,
};
   
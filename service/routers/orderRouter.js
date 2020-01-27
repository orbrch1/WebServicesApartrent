const { Router } = require('express');
const {
    orderController
} = require('../controllers/orderController');

const orderRouter = new Router();

orderRouter.get('/order/getAllOrders', orderController.getAllOrders);
orderRouter.get('/order/getAllOrdersByTenant', orderController.getAllOrdersByTenant);
orderRouter.get('/order/getAllOrdersByLandlord', orderController.getAllOrdersByLandlord);
orderRouter.get('/order/', orderController.getAllOrders);
orderRouter.get('/order/:id', orderController.getOrderById);
orderRouter.post('/order/', orderController.addOrder);
orderRouter.put('/order/:id', orderController.editOrder);
orderRouter.delete('/order/:id', orderController.removeOrder);

module.exports = {
    orderRouter,
};
   
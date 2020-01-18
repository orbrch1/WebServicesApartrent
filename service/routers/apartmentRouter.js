const { Router } = require('express');
const {
    apartmentController
} = require('../controllers/apartmentController');

const apartmentRouter = new Router();

apartmentRouter.get('/all', apartmentController.getAllApartments);
apartmentRouter.get('/', apartmentController.getAllApartments);
// apartmentRouter.get('/:id', apartmentRouter.getApartmentById);
// apartmentRouter.post('/', apartmentRouter.addApartment);
// apartmentRouter.put('/:id', apartmentRouter.editApartment);
// apartmentRouter.delete('/:id', apartmentRouter.removeApartment);
// userRouter.get('/:id', userController.get);
// userRouter.post('/', userController.post);
// userRouter.put('/:id', userController.put);

// //settings
// orderRouter.get('/:id', orderController.get);
// orderRouter.post('/', orderController.post);
// orderRouter.put('/:id', orderController.put);
// orderRouter.delete('/:id', orderController.delete);

module.exports = {
    apartmentRouter,
};
   
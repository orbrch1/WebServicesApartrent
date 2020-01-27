const { Router } = require('express');
const {
    apartmentController
} = require('../controllers/apartmentController');
const apartmentRouter = new Router();

// apartmentRouter.get('/all', apartmentController.getAllApartments);
// apartmentRouter.get('/', apartmentController.getAllApartments);
// apartmentRouter.get('/getAllApartment', apartmentController.getAllApartments);
// apartmentRouter.get('/', apartmentController.getAllApartments);
// apartmentRouter.get('/id/:id', apartmentController.getApartmentById);
apartmentRouter.get('/user/:id', apartmentController.getApartmentByUserId);
apartmentRouter.post('/', apartmentController.addApartment);
// apartmentRouter.put('/:id', apartmentController.editApartment);
// apartmentRouter.delete('/:id', apartmentController.removeApartment);

module.exports = {
    apartmentRouter,
}
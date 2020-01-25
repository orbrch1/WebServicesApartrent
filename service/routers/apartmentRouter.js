const { Router } = require('express');
const {
    apartmentController
} = require('../controllers/apartmentController');

const apartmentRouter = new Router();

apartmentRouter.get('/all', apartmentController.getAllApartments);
apartmentRouter.get('/', apartmentController.getAllApartments);

apartmentRouter.get('/apartment/getAllApartment', apartmentController.getAllApartments);
apartmentRouter.get('/apartment/', apartmentController.getAllApartments);
apartmentRouter.get('/apartment/:id', apartmentController.getApartmentById);
apartmentRouter.post('/apartment/', apartmentController.addApartment);
apartmentRouter.put('/apartment/:id', apartmentController.editApartment);
apartmentRouter.delete('/apartment/:id', apartmentController.removeApartment);

module.exports = {
    apartmentRouter,
};
   
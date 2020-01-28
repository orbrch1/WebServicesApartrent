const { Router } = require('express');
const {
    publicationController
} = require('../controllers/publicationController');
const publicationRouter = new Router();


publicationRouter.get('/getAllPublications', publicationController.getAllPublications); //
publicationRouter.get('/', publicationController.getAllPublications);
publicationRouter.get('/user/:id', publicationController.getPublicationByUserId);
publicationRouter.get('/apartment/:id', publicationController.getPublicationByApartmentId);
publicationRouter.get('/id/:id', publicationController.getPublicationById);
publicationRouter.post('/', publicationController.addPublication);
publicationRouter.put('/:id', publicationController.editPublication);
publicationRouter.delete('/:id', publicationController.removePublication);

module.exports = {
    publicationRouter,
};
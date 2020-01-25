const { Router } = require('express');
const {
    messageController
} = require('../controllers/reviewController');

const messageController = new Router();

messageRouter.get('/message/getAllOffers', messageController.getAllMessages);
messageRouter.get('/message/', messageController.getAllOffers);
messageRouter.get('/message/:id', messageController.getMessageById);
messageRouter.post('/message/', messageController.addMessage);
messageRouter.put('/message/:id', messageController.editMessage);
messageRouter.delete('/message/:id', messageController.removeMessage);

// //settings
// orderRouter.get('/:id', reviewController.get);
// orderRouter.post('/', orderController.post);
// orderRouter.put('/:id', orderController.put);
// orderRouter.delete('/:id', orderController.delete);

module.exports = {
    messageRouter,
};
   
const { Router } = require('express');
const {
    messageController
} = require('../controllers/messageController');

const messageRouter = new Router();

messageRouter.get('/getAllMessages', messageController.getAllMessages); 
messageRouter.get('/', messageController.getAllMessages);  
messageRouter.get('/landlord/:id', messageController.getMessageByLandlordId);
messageRouter.get('/tenant/:id', messageController.getMessageByTenantId);
messageRouter.get('/id/:id', messageController.getMessageById); 
messageRouter.post('/', messageController.addMessage);
messageRouter.put('/:id', messageController.editMessage);
messageRouter.delete('/:id', messageController.removeMessage);

module.exports = {
    messageRouter,
};
   
const { Router } = require('express');
const {
    userController
} = require('../controllers/userController');

const userRouter = new Router();

userRouter.get('/user/getAllUsers', userController.getAllUsers);
userRouter.get('/user/', userController.getAllUsers);
userRouter.get('/user/:id', userController.getUserById);
userRouter.post('/user/', userController.addUser);
userRouter.put('/user/:id', userController.editUser);
userRouter.delete('/user/:id', userController.removeUser);
// userRouter.get('/:id', userController.get);

// //settings
// orderRouter.get('/:id', orderController.get);
// orderRouter.post('/', orderController.post);
// orderRouter.put('/:id', orderController.put);
// orderRouter.delete('/:id', orderController.delete);

module.exports = {
    userRouter,
};
   
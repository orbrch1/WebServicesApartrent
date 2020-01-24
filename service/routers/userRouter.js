const { Router } = require('express');
const {
    userController
} = require('../controllers/userController');

const userRouter = new Router();

userRouter.get('/user/getAllUsers', userController.getAllUsers);
// userRouter.get('/', userController.getAllUsers);
// userRouter.get('/:id', userController.getUserById);
// userRouter.post('/', userController.addUser);
// userRouter.put('/:id', userController.editUser);
// userRouter.delete('/:id', userController.removeUser);
// userRouter.get('/:id', userController.get);
// userRouter.post('/', userController.post);
// userRouter.put('/:id', userController.put);

// //settings
// orderRouter.get('/:id', orderController.get);
// orderRouter.post('/', orderController.post);
// orderRouter.put('/:id', orderController.put);
// orderRouter.delete('/:id', orderController.delete);

module.exports = {
    userRouter,
};
   
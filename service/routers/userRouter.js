const { Router } = require('express');
const {
    userController
} = require('../controllers/userController');

const userRouter = new Router();

userRouter.get('/getAllUsers', userController.getAllUsers);
userRouter.get('/', userController.getAllUsers);
userRouter.get('/username/:username', userController.getUserByUsername);
userRouter.get('/id/:id', userController.getUserById);
userRouter.post('/', userController.addUser);
userRouter.put('/:id', userController.editUser);
userRouter.delete('/:id', userController.removeUser);

module.exports = {
    userRouter,
};
   
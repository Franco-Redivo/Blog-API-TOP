const { Router } = require('express');
const userController = require('../controllers/userController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

const userRouter = Router();

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.get('/:id/posts', verifyToken, userController.getPostsByUserId);
userRouter.put('/:id', [verifyToken, isAdmin], userController.updateUser);
userRouter.delete('/:id', [verifyToken, isAdmin], userController.deleteUser);

module.exports = userRouter;

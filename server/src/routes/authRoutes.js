const { Router } = require('express');
const authController = require('../controllers/authController');

const authRouter = Router();

authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);

//TODO: handle logout and token refresh if needed

module.exports = authRouter;

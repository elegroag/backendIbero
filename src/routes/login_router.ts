import { Router, Application } from 'express';
import LoginController from '../controllers/login_controller';
import { validaToken } from '../middlewares/authentication';

export const LoginRouter = (app: Application): void => {
	const router = Router();
	router.post('/token', LoginController.postToken);
	router.post('/autenticate', validaToken, LoginController.postAutenticate);
	router.post('/signup', LoginController.postSignup);
	router.post('/test', validaToken, LoginController.getTest);
	app.use('/api/login', router);
};

import { Router, Application } from 'express';
import LoginController from '../controllers/login_controller';

export const LoginRouter = (app: Application): void => {
	const router = Router();
	router.get('/token', LoginController.getToken);
	router.post('/autenticate', LoginController.postAutenticate);
	router.post('/signup', LoginController.postSignup);
	router.post('/test', LoginController.getTest);
	app.use('/api/login', router);
};

import { Router, Application } from 'express';
import { LoginController } from '../controllers/login_controller';

export const LoginRouter = (app: Application): void => {
	const router = Router();
	const loginController = new LoginController();
	router.get('/token', loginController.getToken);
	router.post('/autenticate', loginController.postAutenticate);
	router.post('/signup', loginController.postSignup);
	app.use('/api/login', router);
};

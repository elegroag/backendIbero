import { Application, Router } from 'express';
import UsersController from '../controllers/users_controller';

export const UsersRouter = (app: Application): void => {
	const router = Router();
	router.get('/', UsersController.getAll);
	router.post('/', UsersController.postCreate);
	app.use('/api/users', router);
};

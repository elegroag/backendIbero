import { Application, Router } from 'express';
import { UsersController } from '../controllers/users_controller';

export const UsersRouter = (app: Application): void => {
	const router = Router();
	const userController = new UsersController();
	router.get('/', userController.getAll);
	router.post('/', userController.postCreate);
	app.use('/api/users', router);
};

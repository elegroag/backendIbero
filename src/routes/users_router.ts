import { Application, Router } from 'express';
import UsersController from '../controllers/users_controller';
import { validaToken } from '../middlewares/authentication';

export const UsersRouter = (app: Application): void => {
	const router = Router();
	router.get('/', validaToken, UsersController.getAll);
	router.post('/', validaToken, UsersController.postCreate);
	router.delete('/user', validaToken, UsersController.deleteEntity);
	app.use('/api/users', router);
};

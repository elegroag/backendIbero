import { Router, Application } from 'express';
import ClientesController from '../controllers/clientes_controller';
import { validaToken } from '../middlewares/authentication';

export const ClientesRouter = (app: Application): void => {
	const router = Router();
	router.get('/', validaToken, ClientesController.getAll);
	router.get('/:id', validaToken, ClientesController.getById);
	router.post('/', validaToken, ClientesController.postCreate);
	app.use('/api/clientes', router);
};

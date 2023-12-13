import { Router, Application } from 'express';
import { ClientesController } from '../controllers/clientes_controller';

export const ClientesRouter = (app: Application): void => {
	const router = Router();
	const clientesController = new ClientesController();
	router.get('/', clientesController.getAll);
	router.get('/:id', clientesController.getById);
	router.post('/', clientesController.postCreate);
	app.use('/api/clientes', router);
};

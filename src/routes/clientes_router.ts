import { Router, Application } from 'express';
import ClientesController from '../controllers/clientes_controller';

export const ClientesRouter = (app: Application): void => {
	const router = Router();
	router.get('/', ClientesController.getAll);
	router.get('/:id', ClientesController.getById);
	router.post('/', ClientesController.postCreate);
	app.use('/api/clientes', router);
};

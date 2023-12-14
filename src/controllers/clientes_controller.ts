import { Request, Response } from 'express';
import * as clientesServices from '../services/clientes_services';
import { ClientesEntry } from '../types';

const ClientesController = {
	getAll(_req: Request, res: Response): Response {
		return res.json({
			success: true,
			msj: 'OK get',
			data: clientesServices.getNoEmailClientes(),
		});
	},

	getById(req: Request, res: Response): Response {
		//const clienteEntry = clientesServices.findById(Number(req.params.id));
		const clienteEntry = clientesServices.findById(+req.params.id);
		if (clienteEntry) {
			return res.json({
				success: true,
				msj: 'OK get',
				data: clienteEntry?.cedclie,
			});
		} else {
			return res.sendStatus(404);
		}
	},

	postCreate(req: Request, res: Response): Response {
		// const { cedclie, tipdoc, first_name, codstat, last_name, phone, email, create_at, update_at } = req.body;
		const newCliente = clientesServices.toNewClienteEntry(req.body);
		const clienteEntry: ClientesEntry | undefined = clientesServices.addClientToList(newCliente);
		return res.json({
			success: true,
			msj: 'OK post',
			entity: clienteEntry,
		});
	},
};

export default ClientesController;

import { NextFunction, Request, Response } from 'express';
import { ClienteService } from '../services/cliente.service';
import { HttpException } from '../exceptions/http_exception';
import { Cliente } from '../repositories/entities/cliente.entity';

const ClientesController = {
	/**
	 * getAll function
	 * @param _req
	 * @param res
	 * @param next
	 * @returns Response
	 */
	async getAll(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const clienteService = new ClienteService();
			return res.json({
				success: true,
				msj: 'OK get',
				data: await clienteService.getListClientes(),
			});
		} catch (error) {
			next(new HttpException(501, error));
		}
	},

	/**
	 * getById function
	 * @param req
	 * @param res
	 * @param next
	 * @returns Response
	 */
	async getById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const clienteService = new ClienteService();
			const clienteEntry = await clienteService.findById(+req.params.id);
			if (clienteEntry instanceof Cliente) {
				return res.json({
					success: true,
					msj: 'OK get',
					data: clienteEntry.cedclie,
				});
			} else {
				throw new Error('El recurso no es un cliente valido');
			}
		} catch (error) {
			next(new HttpException(501, error));
		}
	},

	/**
	 * postCreate function
	 * @param req
	 * @param res
	 * @param next
	 * @returns Response
	 */
	async postCreate(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const clienteService = new ClienteService();
			const newCliente = clienteService.toNewClienteEntry(req.body);
			const clienteEntry = clienteService.create(newCliente);
			return res.json({
				success: true,
				msj: 'OK post',
				entity: clienteEntry,
			});
		} catch (error) {
			next(new HttpException(501, error));
		}
	},

	/**
	 * getLoad function
	 * @param _req
	 * @param res
	 * @param next
	 * @returns Response
	 */
	async getLoad(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const clienteService = new ClienteService();
			const list = await clienteService.getListJson();
			const errors: Array<string> = [];
			const clientesCollection = await Promise.all(
				list.map(async (cliente): Promise<Cliente | null> => {
					const has = await clienteService.findByCedClient(+cliente.cedclie, cliente.email);
					if (has) {
						errors.push(`El cliente ${cliente.cedclie} ya existe creado, no se requiere de más acciones.`);
						return null;
					} else {
						return await clienteService.create(cliente);
					}
				})
			);

			// console.log('Collection', clientesCollection);
			return res.json({
				success: true,
				msj: 'Cargue de clientes completado',
				collection: clientesCollection.filter((cliente) => cliente),
				errors: errors,
			});
		} catch (error) {
			next(new HttpException(501, error));
		}
	},
};

export default ClientesController;

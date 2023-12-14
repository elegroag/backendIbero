import clientesJson from '../repositories/models/clientes_json';
import { ClientesEntry, NoEmailClientesEntry, EmailPhoneClientesEntry, NewClienteEntry } from '../types';
import * as utils from '../lib/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewClienteEntry = (object: object | any): NewClienteEntry => {
	const newCliente: NewClienteEntry = {
		cedclie: utils.parseNumber(object.cedclie),
		email: utils.parseEmail(object.email),
		first_name: utils.isString(object.first_name) ? object.first_name : '',
		last_name: utils.isString(object.last_name) ? object.last_name : '',
		phone: utils.isString(object.phone) ? object.phone : '',
		create_at: utils.isDate(object.create_at) ? object.create_at : '',
		update_at: utils.isDate(object.update_at) ? object.update_at : '',
		tipdoc: utils.parseCoddoc(object.tipdoc),
		codstat: utils.parseCodstat(object.codstat),
	};
	return newCliente;
};

const clienteEntities: Array<ClientesEntry> = clientesJson;

export const getListClientes = (): ClientesEntry[] => clienteEntities;

export const getNoEmailClientes = (): NoEmailClientesEntry[] => {
	return clienteEntities.map(
		({ id, cedclie, tipdoc, first_name, codstat, last_name, phone, create_at, update_at }) => {
			return {
				id,
				cedclie,
				tipdoc,
				first_name,
				codstat,
				last_name,
				phone,
				create_at,
				update_at,
			};
		}
	);
};

/**
 * function findById
 * @param id
 * @returns ClientesEntry | undefined
 */
export const findById = (id: number): NoEmailClientesEntry | undefined => {
	const entry = clienteEntities.find((d) => d.id == id);
	if (entry) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { email, ...clientesFilter } = entry;
		return clientesFilter;
	}
	return undefined;
};

export const getContactClientes = (): EmailPhoneClientesEntry[] => clienteEntities;

/**
 * function addClientToList
 * @param newClienteEntry
 * @returns
 */
export const addClientToList = (newClienteEntry: NewClienteEntry): ClientesEntry | undefined => {
	const newCliente: ClientesEntry = {
		id: Math.max(...clienteEntities.map((d) => d.id)) + 1,
		...newClienteEntry,
	};
	clienteEntities.push(newCliente);
	return newCliente;
};

import clientesJson from '../repositories/models/clientes_json';
import { ClientesEntry, NoEmailClientesEntry, EmailPhoneClientesEntry, NewClienteEntry } from '../types';

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

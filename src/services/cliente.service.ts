import { Cliente } from '../repositories/entities/cliente.entity';
import { AppDataSource } from '../lib/data-source';
import clientesJson from '../repositories/models/clientes_json';
import { ClientesEntry, NoEmailClientesEntry, EmailPhoneClientesEntry, NewClienteEntry } from '../types';
import * as utils from '../lib/utils';
import { Repository } from 'typeorm';

export class ClienteService {
	private clienteRepository: Repository<Cliente>;
	private clienteEntities: Array<ClientesEntry>;

	constructor() {
		this.clienteRepository = AppDataSource.getRepository(Cliente);
		this.clienteEntities = clientesJson;
	}

	public getNoEmailClientesJson(): NoEmailClientesEntry[] {
		return this.clienteEntities.map(
			({ id, cedclie, tipdoc, first_name, codstat, last_name, phone, create_as, update_as }) => {
				return {
					id,
					cedclie,
					tipdoc,
					first_name,
					codstat,
					last_name,
					phone,
					create_as,
					update_as,
				};
			}
		);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public toNewClienteEntry(object: object | any): NewClienteEntry {
		const newCliente: NewClienteEntry = {
			cedclie: utils.parseNumber(object.cedclie),
			email: utils.parseEmail(object.email),
			first_name: utils.isString(object.first_name) ? object.first_name : '',
			last_name: utils.isString(object.last_name) ? object.last_name : '',
			phone: utils.isString(object.phone) ? object.phone : '',
			create_as: utils.isDate(object.create_as) ? object.create_as : '',
			update_as: utils.isDate(object.update_as) ? object.update_as : '',
			tipdoc: utils.parseCoddoc(object.tipdoc),
			codstat: utils.parseCodstat(object.codstat),
		};
		return newCliente;
	}

	public async getListJson(): Promise<ClientesEntry[]> {
		return this.clienteEntities;
	}

	public async getListClientes(): Promise<ClientesEntry[] | boolean> {
		const clientes = await this.clienteRepository.find();
		if (clientes) {
			return clientes.map((cliente): ClientesEntry => {
				return {
					id: cliente.id,
					cedclie: cliente.cedclie,
					last_name: cliente.lastName,
					first_name: cliente.firstName,
					email: cliente.email,
					phone: cliente.phone,
					create_as: cliente.createAs,
					update_as: cliente.updateAs,
					tipdoc: utils.parseCoddoc(cliente.tipdoc),
					codstat: utils.parseCodstat(cliente.codstat),
				};
			});
		} else {
			return false;
		}
	}

	public async findById(id: number): Promise<NoEmailClientesEntry | boolean> {
		const entry = await this.clienteRepository.findOneBy({ id: id });
		if (entry instanceof Cliente) {
			return {
				cedclie: Number(entry.cedclie),
				id: Number(entry.id),
				last_name: '' + entry.lastName,
				first_name: '' + entry.firstName,
				phone: entry.phone,
				tipdoc: utils.parseCoddoc('' + entry.tipdoc),
				create_as: entry.createAs,
				update_as: entry.updateAs,
				codstat: utils.parseCodstat('' + entry.codstat),
			};
		} else {
			return false;
		}
	}

	public async getContactClientes(): Promise<EmailPhoneClientesEntry[] | boolean> {
		const clientes = await this.clienteRepository.find();
		if (clientes) {
			return clientes.map((cliente): EmailPhoneClientesEntry => {
				return {
					cedclie: cliente.cedclie,
					id: cliente.id,
					last_name: cliente.lastName,
					first_name: cliente.firstName,
					email: cliente.email,
					phone: cliente.phone,
				};
			});
		} else {
			return false;
		}
	}

	public async create(entity: NewClienteEntry): Promise<Cliente> {
		const cliente = new Cliente();
		cliente.cedclie = entity.cedclie;
		cliente.lastName = entity.last_name;
		cliente.firstName = entity.first_name;
		cliente.phone = entity.phone;
		cliente.email = entity.email;
		cliente.createAs = entity.create_as;
		cliente.updateAs = entity.update_as;
		cliente.tipdoc = entity.tipdoc;
		cliente.codstat = entity.codstat;
		await this.clienteRepository.save(cliente);
		return cliente;
	}

	public async findByCedClient(cedclie: number, email: string): Promise<Cliente | null> {
		// console.log(identification);
		const cliente = await this.clienteRepository.findOneBy({ cedclie: cedclie });
		if (!cliente) {
			return await this.clienteRepository.findOneBy({ email: email });
		}
		return cliente;
	}
}

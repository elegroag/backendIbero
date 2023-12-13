import { Coddoc, CodStatus } from './repositories/enums';

export type TypeCoddoc = 'CC' | 'TI' | 'RG' | 'DC' | 'PT' | 'CE' | 'PTP';

export type TypeCodStatus = 'A' | 'I' | 'B' | 'S';

export interface ClientesEntry {
	id: number;
	cedclie: number;
	tipdoc: Coddoc;
	first_name: string;
	codstat: CodStatus;
	last_name: string;
	email: string;
	phone: string;
	create_at: string;
	update_at: string;
}

export type NoEmailClientesEntry = Omit<ClientesEntry, 'email'>;

export type EmailPhoneClientesEntry = Pick<ClientesEntry, 'email' | 'phone'>;

export type NewClienteEntry = Omit<ClientesEntry, 'id'>;

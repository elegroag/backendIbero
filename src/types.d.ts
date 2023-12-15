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

export interface UserEntry {
	id: number;
	identification: number;
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	create_as: Date;
	update_as: Date;
	password: string;
	session_token: string;
	imagen: string;
	is_available: boolean;
}

export type NoEmailClientesEntry = Omit<ClientesEntry, 'email'>;

export type EmailPhoneClientesEntry = Pick<ClientesEntry, 'email' | 'phone'>;

export type NewClienteEntry = Omit<ClientesEntry, 'id'>;

export type NewUserEntry = Omit<UserEntry, 'id'>;

export type AuthUserEntry = Pick<UserEntry, 'email' | 'password'>;

export type AuthUser = Omit<UserEntry, 'password'>;

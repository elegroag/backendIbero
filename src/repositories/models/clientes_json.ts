import { ClientesEntry } from '../../types';
import { CodStatus, Coddoc } from '../enums';

const clientesJson: Array<ClientesEntry> = [
	{
		id: 1,
		cedclie: 1110491951,
		tipdoc: Coddoc.CC,
		codstat: CodStatus.A,
		first_name: 'edwin andres',
		last_name: 'legro agudelo',
		email: 'elegro@ibero.edu.co',
		phone: '057@3157145942',
		create_at: '2023-01-01',
		update_at: '2023-06-01',
	},
	{
		id: 2,
		cedclie: 1110491952,
		tipdoc: Coddoc.PT,
		codstat: CodStatus.B,
		first_name: 'alan andres',
		last_name: 'paez agudelo',
		email: 'paez@ibero.edu.co',
		phone: '057@3157145942',
		create_at: '2023-01-01',
		update_at: '2023-06-01',
	},
	{
		id: 3,
		cedclie: 1110491953,
		tipdoc: Coddoc.CE,
		codstat: CodStatus.S,
		first_name: 'felipe andres',
		last_name: 'herrera agudelo',
		email: 'herrera@ibero.edu.co',
		phone: '057@3157145942',
		create_at: '2023-01-01',
		update_at: '2023-06-01',
	},
];

export default clientesJson;

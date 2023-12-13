/* eslint-disable @typescript-eslint/no-explicit-any */
import { CodStatus, Coddoc } from '../repositories/enums';
import { NewClienteEntry } from '../types';

const parseEmail = (emailFromRequest: any): string => {
	if (!isString(emailFromRequest)) {
		throw new Error('Incorrecto el valor del email');
	}
	return emailFromRequest;
};

const parseDate = (dateFromRequest: any): string => {
	if (!(isString(dateFromRequest) && isDate(dateFromRequest))) {
		throw new Error('Incorrecto el valor del la fecha');
	}
	return dateFromRequest;
};

const parseCoddoc = (coddocFromRequest: any): Coddoc => {
	if (!isString(coddocFromRequest)) {
		throw new Error('Incorrecto el valor del tipo documento');
	}
	if (!isCoddoc(coddocFromRequest)) {
		throw new Error('Incorrecto el valor del tipo documento');
	}
	return coddocFromRequest;
};

const parseCodstat = (codstatFromRequest: any): CodStatus => {
	if (!isString(codstatFromRequest)) {
		throw new Error('Incorrecto el valor del estado');
	}
	if (!isCodstat(codstatFromRequest)) {
		throw new Error('Incorrecto el valor del estado');
	}
	return codstatFromRequest;
};

const parseCedclient = (cedclieFromRequest: any): number => {
	if (!isNumber(cedclieFromRequest)) {
		throw new Error('Incorrecto el valor no es numérico');
	}
	return Number(cedclieFromRequest);
};

const isCoddoc = (coddoc: any): boolean => {
	// return ['CC', 'TI', 'RG', 'DC', 'PT', 'CE', 'PTP'].includes(coddoc);
	//modo refactor del metodo previo
	return Object.values(Coddoc).includes(coddoc);
};

const isCodstat = (codstat: any): boolean => {
	return Object.values(CodStatus).includes(codstat);
};

const isNumber = (num: any): boolean => {
	return Boolean(Number(num));
};

const isString = (strs: any): boolean => {
	return typeof strs === 'string' || strs instanceof String ? true : false;
};

const isDate = (date: any): boolean => {
	return Boolean(Date.parse(date));
};

const toNewClienteEntry = (object: object | any): NewClienteEntry => {
	const newCliente: NewClienteEntry = {
		cedclie: parseCedclient(object.cedclie),
		email: parseEmail(object.email),
		first_name: isString(object.first_name) ? object.first_name : '',
		last_name: isString(object.last_name) ? object.last_name : '',
		phone: isString(object.phone) ? object.phone : '',
		create_at: parseDate(object.create_at),
		update_at: parseDate(object.update_at),
		tipdoc: parseCoddoc(object.tipdoc),
		codstat: parseCodstat(object.codstat),
	};
	return newCliente;
};

export default toNewClienteEntry;

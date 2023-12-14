/* eslint-disable @typescript-eslint/no-explicit-any */
import { CodStatus, Coddoc } from '../repositories/enums';

export const parseEmail = (emailFromRequest: any): string => {
	if (!isString(emailFromRequest)) {
		throw new Error('Incorrecto el valor del email');
	}
	return emailFromRequest;
};

export const parseDate = (dateFromRequest: any): Date => {
	if (!(isString(dateFromRequest) && isDate(dateFromRequest))) {
		throw new Error('Incorrecto el valor de la fecha');
	}
	return new Date(dateFromRequest);
};

export const parseCoddoc = (coddocFromRequest: any): Coddoc => {
	if (!isString(coddocFromRequest)) {
		throw new Error('Incorrecto el valor del tipo documento');
	}
	if (!isCoddoc(coddocFromRequest)) {
		throw new Error('Incorrecto el valor del tipo documento');
	}
	return coddocFromRequest;
};

export const parseCodstat = (codstatFromRequest: any): CodStatus => {
	if (!isString(codstatFromRequest)) {
		throw new Error('Incorrecto el valor del estado');
	}
	if (!isCodstat(codstatFromRequest)) {
		throw new Error('Incorrecto el valor del estado');
	}
	return codstatFromRequest;
};

export const parseNumber = (cedclieFromRequest: any): number => {
	if (!isNumber(cedclieFromRequest)) {
		throw new Error('Incorrecto el valor no es numérico');
	}
	return Number(cedclieFromRequest);
};

export const isCoddoc = (coddoc: any): boolean => {
	// return ['CC', 'TI', 'RG', 'DC', 'PT', 'CE', 'PTP'].includes(coddoc);
	//modo refactor del metodo previo
	return Object.values(Coddoc).includes(coddoc);
};

export const isCodstat = (codstat: any): boolean => {
	return Object.values(CodStatus).includes(codstat);
};

export const isNumber = (num: any): boolean => {
	return Boolean(Number(num));
};

export const isString = (strs: any): boolean => {
	return typeof strs === 'string' || strs instanceof String ? true : false;
};

export const isBoolean = (str: any): boolean => {
	return typeof str === 'boolean' || str instanceof Boolean ? true : false;
};

export const isDate = (date: any): boolean => {
	return Boolean(Date.parse(date));
};

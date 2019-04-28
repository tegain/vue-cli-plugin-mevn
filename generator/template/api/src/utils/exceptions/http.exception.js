import { isObject } from '../shared';

export class HttpException extends Error {
	constructor (response, status) {
		super();
		this.message = response;
		this.status = status;
	}

	/**
	 * @param {object|string} message
	 * @param {string} error
	 * @param {number} statusCode
	 */
	static createHttpExceptionBody (message, error, statusCode) {
		if (!message) {
			return { statusCode, error };
		}
		return isObject(message) && !Array.isArray(message)
			? message
			: { statusCode, error, message };
	}
}

import { HttpException } from './http.exception';
import { HttpStatus } from '../http-status';

export class ForbiddenException extends HttpException {
	constructor (message, error = 'Forbidden') {
		super(
			HttpException.createHttpExceptionBody(message, error, HttpStatus.FORBIDDEN),
			HttpStatus.FORBIDDEN,
		);
	}
}

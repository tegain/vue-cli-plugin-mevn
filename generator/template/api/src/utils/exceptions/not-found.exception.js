import { HttpException } from './http.exception';
import { HttpStatus } from '../http-status';

export class NotFoundException extends HttpException {
	constructor (message, error = 'Not found') {
		super(
			HttpException.createHttpExceptionBody(message, error, HttpStatus.NOT_FOUND),
			HttpStatus.NOT_FOUND,
		);
	}
}

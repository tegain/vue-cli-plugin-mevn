import { HttpException } from './http.exception';
import { HttpStatus } from '../http-status';

export class BadRequestException extends HttpException {
	constructor (message, error = 'Bad Request') {
		super(
			HttpException.createHttpExceptionBody(message, error, HttpStatus.BAD_REQUEST),
			HttpStatus.BAD_REQUEST,
		);
	}
}

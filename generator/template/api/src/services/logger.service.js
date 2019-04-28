import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import chalk from 'chalk';

export class LoggerService {
	constructor () {
		const developmentLog = function (tokens, req, res) {
			return [
				chalk.green('[API] ' + process.pid + '   '),
				chalk.white(new Date(tokens.date(req, res)).toLocaleString() + ' '),
				chalk.green('-'),
				chalk.yellow('[RequestHandler]'),
				chalk.green('{'),
				chalk.hex('#34ace0')(tokens.method(req, res)),
				chalk.hex('#ffb142').bold(tokens.url(req, res)),
				chalk.green('}'),
				chalk.hex('#ff5252').bold(tokens.status(req, res)),
				chalk.yellow(tokens['response-time'](req, res) + ' ms'),
			].join(' ');
		};
		// const logLevel = process.env.NODE_ENV === 'production' ? 'combined' : developmentLog;
		this.logger = process.env.NODE_ENV === 'production'
			? morgan('combined', { stream: this.writeToFile() })
			: morgan(developmentLog);
	}

	/**
	 * Log message in console
	 *
	 * @param {string} message
	 * @param {string} context
	 */
	static log (message, context = 'Application') {
		const time = new Date().toLocaleString();
		console.log(
			chalk.green(`[API] ${process.pid}    ${chalk.white(time)}  - ${chalk.yellow('[' + context + ']')} ${message}`)
		);
	}

	/**
	 * Log error message in console
	 *
	 * @param {string} message
	 * @param {string} context
	 */
	static error (message, context = 'Application') {
		const time = new Date().toLocaleString();
		console.log(
			chalk.red(`[API] ${process.pid}    ${chalk.white(time)}  - ${chalk.yellow('[' + context + ']')} ${message}`)
		);
	}

	/**
	 * Format string with Chalk options
	 *
	 * @param {string} value
	 * @param {string} format
	 */
	static format (value, format) {
		return chalk[format](value);
	}

	writeToFile () {
		const dir = path.join(__BASEDIR, 'logs');
		const target = path.join(dir, 'access.log');
		const options = { flags: 'a' };

		if (!fs.existsSync(dir)){
			fs.mkdirSync(dir);
		}

		return fs.createWriteStream(target, options);
	}
}

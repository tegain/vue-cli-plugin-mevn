import path from 'path';
import express from 'express';
import * as bodyParser from 'body-parser';
import { startClient } from './database/connect';
import { LoggerService } from './services/logger.service';

import { ExampleModule } from './modules/example/example.module';

class AppFactory {
	constructor () {
		this.initDatabaseConnection();
		this.app = express();

		/** Set config & middlewares */
		this.config();

		/** Add API routes */
		this.initializeModules();

		this.getIndex();

		this.app.use('*', (req, res) => {
			res.status(404).json({
				statusCode: 404,
				error: 'Not found',
			});
		})
	}

	/**
	 * Initialize database connection
	 *
	 * @private
	 */
	initDatabaseConnection () {
		startClient()
			.then(() => {
				LoggerService.log('Successfully connected to database', 'DatabaseConnection');
			})
			.catch(error => {
				LoggerService.error(error.message, 'DatabaseConnection');
			});
	}

	/**
	 * Initialize application modules
	 *
	 * @private
	 */
	initializeModules () {
		this.addModule('examples', ExampleModule);
	}

	/**
	 * Inject Module
	 *
	 * @param {string} prefix
	 * @param {Router} Module
	 *
	 * @private
	 */
	addModule (prefix, Module) {
		this.app.use(`${__API_PREFIX}/${prefix}`, Module);
	}

	/**
	 * Set app configuration
	 *
	 * @private
	 */
	config () {
		this.app.use(bodyParser.json());
		this.app.use(new LoggerService().logger);
	}

	getIndex () {
		this.app.get('/', (req, res) => {
			const { name, version, author, description } = require(path.join(__BASEDIR, 'package.json'));
			res.status(200).json({ name, version, author, description });
		});
	}
}

export const App = new AppFactory().app;

import path from 'path';
import express from 'express';
import * as bodyParser from 'body-parser';
import { LoggerService } from './services/logger.service';

import { ExampleModule } from './modules/example/example.module';

class AppFactory {
	constructor () {
		this.app = express();

		/** Set config & middlewares */
		this.config();

		/** Add API routes */
		this.initializeModules();

		this.getIndex();
	}

	initializeModules () {
		this.addModule(ExampleModule);
	}

	/**
	 * Inject Module
	 *
	 * @param {Router} Module
	 *
	 * @private
	 */
	addModule (Module) {
		this.app.use(__API_PREFIX, Module);
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
		this.app.use('/', (req, res) => {
			const { name, version, author, description } = require(path.join(__BASEDIR, 'package.json'));
			res.status(200).json({ name, version, author, description });
		})
	}
}

export const App = new AppFactory().app;

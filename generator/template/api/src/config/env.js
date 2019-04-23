import * as path from 'path';
import dotenv from 'dotenv-flow';

dotenv.config({
	node_env: process.env.NODE_ENV || 'development',
});

global.__API_PREFIX = process.env.API_PREFIX || '';
global.__BASEDIR = path.resolve(__dirname, '../..');

module.exports = (api, options, rootOptions) => {
	api.extendPackage({
		scripts: {
			'api:install': 'cd api && npm i && cd ..',
			'api:start': 'cd api && npm start',
			'api:start:dev': 'cd api && npm run start:dev'
		},
	});

	api.render('./template');

	api.onCreateComplete(() => {
		const fs = require('fs');
		const devEnvPath = api.resolve(`./api/.env.development`);
		const prodEnvPath = api.resolve(`./api/.env.production`);
		const config = [];

		config.push(`API_PORT=${options.configApiPort}`);
		config.push(`API_PREFIX=${options.configApiPrefix}`);
		config.push(`DB_URI=${options.configDbUrl}`);

		fs.writeFileSync(devEnvPath, config.join('\n'), { encoding: 'utf-8' });
		fs.writeFileSync(prodEnvPath, config.join('\n'), { encoding: 'utf-8' });
	});
};

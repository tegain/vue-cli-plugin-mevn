module.exports = (api, options, rootOptions) => {
	api.extendPackage({
		scripts: {
			'api:install': 'cd api && npm i && cd ..',
			'api:start': 'cd api && npm start',
			'api:start:dev': 'cd api && npm run start:dev'
		},
	});

	api.render('./template');
};

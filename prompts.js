module.exports = [
	{
		name: `configApiPort`,
		type: 'number',
		message: 'Enter API PORT',
		default: 5000,
	},
	{
		name: `configDbUrl`,
		type: 'input',
		message: 'Enter Mongo database url',
		default: 'mongodb://localhost:27017/MyDB',
	},
	{
		name: `configApiPrefix`,
		type: 'input',
		message: 'Enter API prefix, ex. : /api/v1',
		default: '',
	},
];

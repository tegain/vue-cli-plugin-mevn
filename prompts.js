module.exports = [
	{
		name: `configDbPort`,
		type: 'number',
		message: 'Enter API PORT',
		default: 5000,
	},
	{
		name: `configDbName`,
		type: 'input',
		message: 'Enter Mongo database name',
		default: 'MyDB',
	},
	{
		name: `configDbHost`,
		type: 'input',
		message: 'Enter Mongo database URL',
		default: 'http://localhost',
	},
];

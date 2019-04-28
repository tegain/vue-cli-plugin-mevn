import mongoose from 'mongoose';

const ExampleSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
});

export const ExampleModel = mongoose.model('Example', ExampleSchema);

import mongoose from 'mongoose';

/**
 * @returns {Promise<mongoose.connection>}
 */
export async function startClient () {
	mongoose.Promise = global.Promise;
	mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
	return await mongoose.connection;
}

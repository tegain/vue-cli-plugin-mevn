import './config/env';
import { LoggerService } from './services/logger.service';
import { App } from './app';

const PORT = process.env.API_PORT || 5000;

async function bootstrap () {
	App.listen(PORT, (err) => {
		if (err) return LoggerService.error(err.message);
		const host = LoggerService.format('http://localhost:' + PORT + __API_PREFIX, 'underline');
		LoggerService.log(`Application API is now up and running on ${host}`);
	});
}
bootstrap();

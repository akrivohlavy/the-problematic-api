import logger from 'app/logger';
import config, { safeConfig } from 'config';
import createServer from './server';

logger.info(safeConfig, 'Loaded config');
createServer().then((server: any) => {
    return server
        .listen(config.server.port)
        .then(() => logger.info(`Server started, port=${config.server.port}`))
        .catch((error: Error) => {
            logger.error(`Server failed to start: ${error.stack}`);
            process.exit(1);
        });
});

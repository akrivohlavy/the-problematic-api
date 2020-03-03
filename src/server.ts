import logger from 'app/logger';
import { createServer } from 'unicore';
import bindRoutes from './config/routes';

export default async () => {
    const server = createServer();
    server.use(logger.express);
    bindRoutes(server);
    return server;
};

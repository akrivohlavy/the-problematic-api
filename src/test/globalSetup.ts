import config, { safeConfig } from 'config';
import logger from '../app/logger';

export default () => {
    logger.info(safeConfig);

    if (!config.enableTests) {
        throw Error('Tests are disabled. Please set "ENABLE_TESTS" configuration variable.');
    }
};

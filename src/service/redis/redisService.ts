import Redis from 'ioredis';
import logger from '../../util/logger';

const redisOptions = {
  host: 'localhost',
  port: 6379,
  maxRetriesPerRequest: null,
};

const redisClient = new Redis(redisOptions);

redisClient.on('connect', () => {
  logger.info('REDIS Connected');
});

redisClient.on('error', (err) => {
  logger.info('ERROR in REDIS CONNECTION', {
    meta: {
      error: err,
    },
  });
});

export default redisClient;


import redis from 'redis';
import { promisify } from 'util';

const redisClient = redis.createClient();

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

const setAsync = promisify(redisClient.set).bind(redisClient);
const getAsync = promisify(redisClient.get).bind(redisClient);

export const redisMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const cachedToken = await getAsync(token);

    if (cachedToken) {
      // Token exists in Redis cache, user is authenticated
      next();
    } else {
      // Token does not exist in Redis cache, user is not authenticated
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Redis middleware error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

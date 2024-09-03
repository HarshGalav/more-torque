const redis = require('redis');
const { promisify } = require('util');

const redisClient = redis.createClient();
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

exports.get = async (key) => {
  return getAsync(key);
};

exports.set = async (key, value, expiry) => {
  return setAsync(key, value, 'EX', expiry);
};

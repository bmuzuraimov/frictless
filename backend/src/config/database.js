const { createClient } = require('redis');
require('dotenv').config();

class RedisSingleton {
  static instance;

  static getInstance() {
    if (!RedisSingleton.instance) {
      RedisSingleton.instance = createClient({
        password: process.env.REDIS_PASSWORD,
        socket: {
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT
        }
      });
      RedisSingleton.instance.on('error', (err) => console.log('Redis Client Error', err));
      RedisSingleton.instance.connect();
    }

    return RedisSingleton.instance;
  }
}

const redis_client = RedisSingleton.getInstance();

module.exports = { redis_client };
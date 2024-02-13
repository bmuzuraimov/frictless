const { createClient } = require('redis');
require('dotenv').config();

class RedisSingleton {
  static instance;

  static async getInstance() {
    if (!RedisSingleton.instance) {
      RedisSingleton.instance = createClient({
        password: process.env.REDIS_PASSWORD,
        socket: {
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT,
        },
        lazyConnect: true, // Do not connect until the first operation is called
      });

      RedisSingleton.instance.on('error', (err) => console.log('Redis Client Error', err));
    }

    if (!RedisSingleton.instance.isOpen) {
      await RedisSingleton.instance.connect();
    }

    return RedisSingleton.instance;
  }

  static async closeInstance() {
    if (RedisSingleton.instance && RedisSingleton.instance.isOpen) {
      await RedisSingleton.instance.quit();
      RedisSingleton.instance = null; // Ensure the instance is re-created in subsequent calls
    }
  }
}

module.exports = RedisSingleton;

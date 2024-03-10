const RedisSingleton = require('@/config/redisdb');

async function generateCode(email) {
    let redis_client = null;
    try {
        // Obtain the Redis client instance
        redis_client = await RedisSingleton.getInstance();

        const randomNum = Math.floor(Math.random() * 1000000);
        const code = String(randomNum).padStart(6, '0');
        const expirationInSeconds = 72 * 60 * 60; // 72 hours in seconds
        await redis_client.set(email, code, {
            EX: expirationInSeconds
        });
        return code;
    } catch (error) {
        console.error('Error in generateCode:', error);
        throw error;
    } finally {
        await RedisSingleton.closeInstance();
    }
}

async function verifyCode(email, code) {
    let redis_client = null;
    try {
        // Obtain the Redis client instance
        redis_client = await RedisSingleton.getInstance();

        const storedCode = await redis_client.get(email);
        if (storedCode === code) {
            await redis_client.del(email);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error in verifyCode:', error);
    } finally {
        await RedisSingleton.closeInstance();
    }
}

module.exports = { generateCode, verifyCode };

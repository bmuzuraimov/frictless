const { redis_client } = require('../config/database');

async function generateCode(email){
    try {
        const randomNum = Math.floor(Math.random() * 1000000);
        const code = String(randomNum).padStart(6, '0');
        const expirationInSeconds = 72 * 60 * 60; // 72 hours in seconds
        await redis_client.set(email+'', code, {
            EX: expirationInSeconds
        });
        return code;
    } catch (error) {
        console.error('Error in generateCode:', error);
        throw error;
    }
}

async function verifyCode(email, code){
    try {
        const storedCode = await redis_client.get(email);
        if(storedCode === code){
            await redis_client.del(email);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error in verifyCode:', error);
        throw error;
    }
}

module.exports = { generateCode, verifyCode };

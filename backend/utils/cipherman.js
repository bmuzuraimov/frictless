const crypto = require("crypto");

const algorithm = 'aes-256-cbc';
const iv = Buffer.from('000102030405060708090a0b0c0d0e0f', 'hex'); // Fixed IV
const key = Buffer.from('00112233445566778899aabbccddeeff00112233445566778899aabbccddeeff', 'hex'); // Fixed Key

const Encipher = (message) => {

    const cipher = crypto.createCipheriv(algorithm, key, iv);

    const cipherBuffer = cipher.update(message);
    const encrypted = Buffer.concat([cipherBuffer, cipher.final()]).toString(
        'base64'
    );
    return encrypted;
}

const Decipher = (encoded) => {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let output = decipher.update(encoded, 'base64', 'utf-8');
    output += decipher.final('utf8');
    return output;
}

module.exports = { Encipher, Decipher }

const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const iv = Buffer.from(process.env.CIPHER_IV, "hex"); // Fixed IV
const key = Buffer.from(process.env.CIPHER_KEY, "hex"); // Fixed Key

const Encipher = (message) => {
  if (!message) {
    console.log("Encoded data is null or undefined");
    return null;
  }
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  const cipherBuffer = cipher.update(message);
  const encrypted = Buffer.concat([cipherBuffer, cipher.final()]).toString(
    "base64"
  );
  return encrypted;
};

const Decipher = (encoded) => {
  if (!encoded) {
    console.log("Encoded data is null or undefined");
    return null;
  }
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let output = decipher.update(encoded, "base64", "utf-8");
  output += decipher.final("utf8");
  return output;
};

module.exports = { Encipher, Decipher };

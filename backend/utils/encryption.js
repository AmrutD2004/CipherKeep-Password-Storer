import crypto from 'crypto';

const algorithm = 'aes-256-cbc';

// ⚠️ MUST be 32 characters
const secretKey = process.env.ENCRYPTION_KEY;

// Encrypt
export const encrypt = (text) => {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(secretKey),
    iv
  );

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return `${iv.toString('hex')}:${encrypted}`;
};

// Decrypt
export const decrypt = (hash) => {
  const [ivHex, encryptedText] = hash.split(':');

  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secretKey),
    Buffer.from(ivHex, 'hex')
  );

  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};
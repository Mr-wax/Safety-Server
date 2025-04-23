// utils/cryptoHash.js

import crypto from 'crypto';

const SALT_LENGTH = 16;
const HASH_ITERATIONS = 100000;
const KEY_LENGTH = 64;
const DIGEST = 'sha512';

// Hash password
export const hashPassword = (password) => {
  const salt = crypto.randomBytes(SALT_LENGTH).toString('hex');
  const hashed = crypto.pbkdf2Sync(password, salt, HASH_ITERATIONS, KEY_LENGTH, DIGEST).toString('hex');
  return `${salt}:${hashed}`;
};

// Verify password
export const verifyPassword = (inputPassword, storedHash) => {
  const [salt, originalHash] = storedHash.split(':');
  const hashed = crypto.pbkdf2Sync(inputPassword, salt, HASH_ITERATIONS, KEY_LENGTH, DIGEST).toString('hex');
  return hashed === originalHash;
};

const crypto = require('crypto');
export const hashed = (data) => {
  return crypto.createHmac('sha256', process.env.REACT_APP_HMAC_HASH_SALT ).update(data).digest('hex');
};
// This is not recommanded to put sensative information here. But for demo purpose I put here
const config = {
    PORT: 3000,
    NODE_ENV: 'development',
    JWT_SECRET: 'mysecret',
    SALT_ROUNDS: 10,
    ALGO: 'HS256',
    EXP_IN: '1h'
};

module.exports = config;
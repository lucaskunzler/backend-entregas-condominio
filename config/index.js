const env = process.env.NODE_ENV || 'development';

const configs = {
  development: {
    JWT_SECRET: process.env.JWT_SECRET || 'dev_jwt_secret',
  },
  test: {
    JWT_SECRET: process.env.JWT_SECRET || 'test_jwt_secret',
  },
  production: {
    JWT_SECRET: process.env.JWT_SECRET,
  },
};

module.exports = configs[env];

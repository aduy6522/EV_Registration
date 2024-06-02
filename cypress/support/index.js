module.exports = (on, config) => {
    require('dotenv').config();
  
    config.env.TEST_FULLNAME_1 = process.env.TEST_FULLNAME_1;
    config.env.TEST_EMAIL_1 = process.env.TEST_EMAIL_1;
    config.env.TEST_PASSWORD_1 = process.env.TEST_PASSWORD_1;
  
    config.env.TEST_FULLNAME_2 = process.env.TEST_FULLNAME_2;
    config.env.TEST_EMAIL_2 = process.env.TEST_EMAIL_2;
    config.env.TEST_PASSWORD_2 = process.env.TEST_PASSWORD_2;
  
    // Return the updated config object
    return config;
  };
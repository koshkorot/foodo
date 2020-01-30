const jwt = require('jsonwebtoken');
const {ACCESS_TOKEN} = require('../config/jwt');
const userDataAccess = require('../dataAccess/user');
const crypto = require('crypto');

function createToken(user) {
  const userTokenObject = {
    id: user.id,
    role: user.role,
  };
  return jwt.sign(
    {user: userTokenObject},
    ACCESS_TOKEN.secretKey,
    ACCESS_TOKEN.signOptions,
  );
}

function hashPassword(password) {
  return crypto.createHash('md5').update(password).digest('hex');
}

module.exports = {
  async login(username, password) {
    password = hashPassword(password);
    console.log(`User ${username} wants to login with password ${password}`);
    const user = await userDataAccess.findByUserPass(username, password);
    if (!user) {
      const error = new Error();
      error.codeString = 'INVALID_CREDENTIAL';
      throw error;
    }
    return {
      user,
      token: createToken(user),
    }
  },

  async signUp(username, firstName, lastName, password, email, phoneNumber) {
    let user = {
      username,
      firstName,
      lastName,
      phoneNumber,
      email,
      role: 'CUSTOMER',
      password: hashPassword(password),
    };
    user = await userDataAccess.insert(user);
    return {
      user,
      token: createToken(user),
    }
  },
};

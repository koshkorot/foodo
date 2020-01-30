module.exports = {
  ACCESS_TOKEN: {
    secretKey: 'foodyToken_SINA_asddjd_O90VASDD',
    signOptions: {
      algorithm: 'HS512',
      audience: 'foody:app',
      subject: 'foody:token',
      issuer: 'foody:server',
      expiresIn: '1d'
    }
  },
};

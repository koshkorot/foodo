module.exports = {
  ACCESS_TOKEN: {
    verifyOptions: {
      algorithms: ['HS512'],
      audience: 'foody:app',
      subject: 'foody:token',
      issuer: 'foody:server',
    },
    secretKey: 'foodyToken_SINA_asddjd_O90VASDD',
  },
};

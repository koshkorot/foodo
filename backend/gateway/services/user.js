const {LoolehFactory} = require('@tapsi/looleh');

module.exports = {
  async login(username, password) {
    const looleh = LoolehFactory.get();
    const data = {
      username, password,
    };
    const {error, token, user} = await looleh.call('user.login', data);
    if (error) {
      throw error;
    }
    return {token, user};
  },

  async signUp(username, firstName, lastName, password, email, phoneNumber, addresses) {
    const looleh = LoolehFactory.get();
    const data = {
      username, firstName, lastName, password, email, phoneNumber, addresses,
    };
    const {error, token, user} = await looleh.call('user.signUp', data);
    if (error) {
      throw error;
    }
    return {token, user};
  }
};

const {LoolehFactory} = require('@tapsi/looleh');

module.exports = {
  async getAddress(userId) {
    const looleh = LoolehFactory.get();
    const data = {
      userId,
    };
    const {error, addresses} = await looleh.call('user.address.get', data);
    if (error) {
      throw error;
    }
    return addresses;
  },
};
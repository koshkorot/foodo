const {LoolehFactory} = require('@tapsi/looleh');

module.exports = {
  async getBalance(userId) {
    const looleh = LoolehFactory.get();
    const data = {
      userId,
    };
    const {error, balance} = await looleh.call('wallet.balance.get', data);
    if (error) {
      throw error;
    }
    return balance;
  },
};


const {LoolehFactory} = require('@tapsi/looleh');

module.exports = {
  async getBalance(userId) {
    const looleh = LoolehFactory.get();
    const data = {
      userId,
    };
    // QUALITY_ATTRIBUTES Availability Exception Detection using timeout
    // QUALITY_ATTRIBUTES Performance Bound Execution Times
    const {error, balance} = await looleh.call('wallet.balance.get', data, { timeout: 5000 });
    if (error) {
      throw error;
    }
    return balance;
  },
};


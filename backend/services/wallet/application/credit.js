module.exports = {
  async getBalance(userId) {
    console.log(`User ${userId} request for his/her balance`);
    return (parseInt(userId) * 2 + 1000);
  }
};

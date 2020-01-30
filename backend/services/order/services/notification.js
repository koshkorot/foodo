const {LoolehFactory} = require('@tapsi/looleh');

module.exports = {
  sendNotification(userId, smsText) {
    const looleh = LoolehFactory.get();
    const data = {
      userId, smsText,
    };
    looleh.send('notification.send', data);
  }
};
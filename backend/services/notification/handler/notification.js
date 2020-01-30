const notificationApplication = require('../application/notification');

const errorHandler = require('../util/errorHandler');

module.exports = {
  async send(message) {
    try {
      const { userId, smsText } = message;
      await notificationApplication.sendSms(userId, smsText);
      return message;
    } catch (error) {
      return errorHandler.handleError(error, message);
    }
  },
};


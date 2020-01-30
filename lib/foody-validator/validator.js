const errorCodes = require('./config/errorCodes.js');

const functions = {
  notNullOrEmpty(value, fieldName) {
    if (typeof value === 'boolean' && value !== null) {
      return;
    }
    if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '')) {
      const error = new Error();
      error.codeString = errorCodes.MISSING_FIELD;
      error.data = { fieldName };
      throw error;
    }
  },
  phoneNumber(value) {
    // +989351234567 or 09351234567
    if (
      (
        value.indexOf('+98') > -1 &&
        (value.length !== 13 || !/^[0-9]+$/.test(value.substring(1, value.length)))
      ) || (
        value.indexOf('+98') === -1 &&
        (value.length !== 11 || !/^[0-9]+$/.test(value))
      )
    ) {
      const error = new Error();
      error.data = { fieldName: 'phoneNumber', value};
      error.codeString = errorCodes.INVALID_VALUE;
      throw error;
    }
  },
  possibleValues(value, possibleValues, fieldName) {
    if (possibleValues && possibleValues.indexOf(value) === -1) {
      const error = new Error();
      error.data = { fieldName};
      error.codeString = errorCodes.INVALID_VALUE;
      throw error;
    }
  },
};

module.exports = functions;


module.exports = {
  UNKNOWN_ERROR: {
    code: 500,
    message: 'خطای ناشناخته',
  },
  INVALID_VALUE: {
    code: 406,
    message: 'ورودی نامعتبر'
  },
  MISSING_FIELD: {
    code: 406,
    message: 'ورودی نامعتبر'
  },
  USER_ALREADY_EXISTS: {
    code: 403,
    message: 'کاربر با این شماره قبلا ثبت نام  شده است.',
  },
  INVALID_CREDENTIAL: {
    code: 403,
    message: 'نام کاربری یا رمز عبور اشتباه است.',
  }
};

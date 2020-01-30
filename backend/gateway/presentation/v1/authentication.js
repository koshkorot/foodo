const router = require('express').Router();
const validator = require('validator');
const errorHandler = require('../../util/errorHandler');
const userService = require('../../services/user');
const UserDTO = require('../../dto/User');


/**
 * @api {post} /v1/authentication/ login via user/pass
 * @apiName Login
 * @apiVersion 1.0.0
 * @apiGroup Authentication
 * @apiPermission none
 * @apiParam {String} username username
 * @apiParam {String} password password
 * @apiParamExample {json} Request-Example:
 {
   "username": "user",
   "password": "pass"
 }
 * @apiSuccess {String} result API request result
 * @apiSuccess {String} data.token user access token which is needed for API requests that need permission
 * @apiSuccessExample {json} Success-Response:
 {
   "result": "OK",
   "data": {
    "user": {Object},
    "token": "123456.abcdefg.123456"
   }
 }
 * @apiError (Error 4xx) {String} result API request result
 * @apiError (Error 4xx) {String} code error code
 * @apiError (Error 4xx) {String} message error message
 * @apiErrorExample {json} Error-Response:
 {
  "result": "ERR",
  "data": {
    "code": "LOGIN_FAILED",
    "message": "نام کاربری یا رمزعبور اشتباه است."
  }
}
 * @apiErrorExample {json} Error-Response:
 {
  "result": "ERR",
  "data": {
    "code": "LOGIN_FAILED",
    "message": "نام کاربری یا رمزعبور اشتباه است."
  }
}

 */
router.post('/', async (req, res) => {
  try {
    const {username, password} = req.body;
    validator.notNullOrEmpty(username, 'username');
    validator.notNullOrEmpty(password, 'password');

    let {token, user} = await userService.login(username, password);
    const result = {
      result: 'OK',
      data: {
        user: new UserDTO(user),
        token,
      },
    };
    res.status(200).json(result);
  } catch (error) {
    errorHandler.sendError(res, error);
  }
});

/**
 * @api {post} /v1/authentication/signup sign up user
 * @apiName SignUp
 * @apiVersion 1.0.0
 * @apiGroup Authentication
 * @apiPermission none
 * @apiParam {String} username username
 * @apiParam {String} password password
 * @apiParam {String} passwordConfirm  password confirm
 * @apiParam {String} email user email address
 * @apiParam {String} phoneNumber user phone number
 * @apiSuccess {String} result API request result
 * @apiSuccess {String} data.token user access token which is needed for API requests that need permission
 * @apiSuccessExample {json} Success-Response:
 {
   "result": "OK",
   "data": {
    "user": {Object},
    "token": "123456.abcdefg.123456"
   }
 }
}

 */
router.post('/signup', async (req, res) => {
  try {
    const {username, firstName, lastName, password, passwordConfirm, email, phoneNumber, addresses} = req.body;
    validator.notNullOrEmpty(username, 'username');
    validator.notNullOrEmpty(firstName, 'firstName');
    validator.notNullOrEmpty(lastName, 'lastName');
    validator.notNullOrEmpty(password, 'password');
    validator.notNullOrEmpty(passwordConfirm, 'passwordConfirm');
    validator.notNullOrEmpty(email, 'email');
    validator.notNullOrEmpty(phoneNumber, 'phoneNumber');

    if (password !== passwordConfirm) {
      const error = new Error();
      error.codeString = 'INVALID_VALUE';
      throw error;
    }

    let {token, user} =
      await userService.signUp(username, firstName, lastName, password, email, phoneNumber, addresses);
    const result = {
      result: 'OK',
      data: {
        user: new UserDTO(user),
        token,
      },
    };
    res.status(200).json(result);
  } catch (error) {
    errorHandler.sendError(res, error);
  }
});

module.exports = router;
const router = require('express').Router();
const errorHandler = require('../../util/errorHandler');
const {authorizeAccessToAPI} = require('../../util/accessManagement');
const walletService = require('../../services/wallet');


/**
 * @api {GET} /v1/credit/balance/:userId get credit
 * @apiName GetBalance
 * @apiVersion 1.0.0
 * @apiGroup Credit
 * @apiPermission none
 * @apiSuccess {String} result API request result
 * @apiSuccess {String} data.token driver access token which is needed for API requests that need permission
 * @apiSuccessExample {json} Success-Response:
 {
   "result": "OK",
   "data": {
    "balance": 15000,
   }
 }
}

 */
router.get('/balance/', authorizeAccessToAPI, async (req, res) => {
  try {
    let {user} = req;

    let balance = await walletService.getBalance(user.id);
    const result = {
      result: 'OK',
      data: {
        balance
      },
    };
    res.status(200).json(result);
  } catch (error) {
    errorHandler.sendError(res, error);
  }
});

module.exports = router;
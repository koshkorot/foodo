const router = require('express').Router();
const errorHandler = require('../../util/errorHandler');
const {authorizeAccessToAPI} = require('../../util/accessManagement');
const orderService = require('../../services/order');


/**
 * @api {POST} /v1/order/ submit an order
 * @apiName SubmitOrder
 * @apiVersion 1.0.0
 * @apiGroup ORDER
 * @apiPermission none
 * @apiSuccess {String} result API request result
 * @apiSuccessExample {json} Success-Response:
 {
   "result": "OK",
   "data": {
     reference: 123123,
   }
 }
 }

 */
router.post('/', authorizeAccessToAPI, async (req, res) => {
  try {
    const {user} = req;
    const {restaurantId, items} = req.body;

    let reference = await orderService.submitOrder(user.id, restaurantId, items);
    const result = {
      result: 'OK',
      data: {
        reference
      },
    };
    res.status(200).json(result);
  } catch (error) {
    errorHandler.sendError(res, error);
  }
});

module.exports = router;
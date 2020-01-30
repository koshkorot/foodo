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
    // QUALITY_ATTRIBUTES Availability Exception Handling
    errorHandler.sendError(res, error);
  }
});

/**
 * @api {GET} /v1/order/:reference get order by reference
 * @apiName GetOrder
 * @apiVersion 1.0.0
 * @apiGroup ORDER
 * @apiPermission none
 * @apiSuccess {String} result API request result
 * @apiSuccessExample {json} Success-Response:
 {
  "result": "OK",
  "data": {
    "order": {
      "userId": 1,
      "restaurantId": 1,
      "payed": false,
      "items": [
        {
          "id": "1-00001-001",
          "price": 30000,
          "name": "پیتزا آمیگو استیک",
          "count": 2
        },
        {
          "id": "1-00001-002",
          "price": 37000,
          "name": "پیتزا آمیگو استیک",
          "count": 1
        }
      ],
      "price": 97000,
      "address": "velenjak, shahid beheshti university",
      "createdAt": "2020-01-30T11:32:01.640Z",
      "id": 21258269
    }
  }
}
 }

 */
router.get('/:reference', authorizeAccessToAPI, async (req, res) => {
  try {
    const {user} = req;
    const {reference} = req.params;

    let order = await orderService.getOrder(user.id, reference);
    const result = {
      result: 'OK',
      data: {
        order
      },
    };
    res.status(200).json(result);
  } catch (error) {
    errorHandler.sendError(res, error);
  }
});


/**
 * @api {DELETE} /v1/order/:reference cancel order by reference
 * @apiName CancelOrder
 * @apiVersion 1.0.0
 * @apiGroup ORDER
 * @apiPermission none
 * @apiSuccess {String} result API request result
 * @apiSuccessExample {json} Success-Response:
 {
  "result": "OK",
}
 }

 */
router.delete('/:reference', authorizeAccessToAPI, async (req, res) => {
  try {
    const {user} = req;
    const {reference} = req.params;
    // QUALITY_ATTRIBUTES Usability Cancel: the system must listen for the cancel request
    await orderService.cancelOrder(user.id, reference);
    const result = {
      result: 'OK',
    };
    res.status(200).json(result);
  } catch (error) {
    errorHandler.sendError(res, error);
  }
});

module.exports = router;
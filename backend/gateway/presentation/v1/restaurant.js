const router = require('express').Router();
const errorHandler = require('../../util/errorHandler');
const {authorizeAccessToAPI} = require('../../util/accessManagement');
const restaurantService = require('../../services/restaurant');


/**
 * @api {GET} /v1/restaurant/search search restaurant
 * @apiName SearchRestaurant
 * @apiVersion 1.0.0
 * @apiGroup Restaurant
 * @apiPermission none
 * @apiSuccess {String} result API request result
 * @apiSuccessExample {json} Success-Response:
 {
   "result": "OK",
   "data": {
    "restaurants": [],
   }
 }
 }

 */
router.post('/search/', authorizeAccessToAPI, async (req, res) => {
  try {
    let query = req.body;

    let restaurants = await restaurantService.searchRestaurant(query);
    const result = {
      result: 'OK',
      data: {
        restaurants
      },
    };
    res.status(200).json(result);
  } catch (error) {
    errorHandler.sendError(res, error);
  }
});

/**
 * @api {GET} /v1/restaurant/menu/:restaurantId get menu of specific restaurant
 * @apiName GetMenu
 * @apiVersion 1.0.0
 * @apiGroup Restaurant
 * @apiPermission none
 * @apiSuccess {String} result API request result
 * @apiSuccessExample {json} Success-Response:
 {
   "result": "OK",
   "data": {
    "menu": [],
   }
 }
 }

 */
router.get('/menu/:restaurantId', authorizeAccessToAPI, async (req, res) => {
  try {
    let {restaurantId} = req.params;

    let menu = await restaurantService.getMenu(restaurantId);
    const result = {
      result: 'OK',
      data: {
        menu
      },
    };
    res.status(200).json(result);
  } catch (error) {
    errorHandler.sendError(res, error);
  }
});

module.exports = router;
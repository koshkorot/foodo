const router = require('express').Router();


/**
 * @api {get} /v1 Root of server API
 * @apiName Root
 * @apiVersion 1.0.0
 * @apiGroup Index
 * @apiPermission none
 * @apiSuccess {String} result API request result
 * @apiSuccessExample {json} Success-Response:
 {
   "result": "OK"
 }
 */
router.get('/', async (req, res) => {
  res.status(200).json({
    result: 'OK',
  });
});

module.exports = router;
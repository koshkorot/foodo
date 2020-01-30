module.exports = {
  async authorizeAccessToAPI(req, res, next) {
    // QUALITY_ATTRIBUTES Security Authentication with token
    // QUALITY_ATTRIBUTES Security Authorization could be provide by similar middleware
    if (!req.user || !req.user.role) {
      res.status(403).json({
        result: 'ERR',
        data: {
          code: 'UNAUTHORIZED_ACCESS',
        },
      });
      console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
      return;
    }
    next();
  },
};

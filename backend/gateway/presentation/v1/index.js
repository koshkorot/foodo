const routes = {
  '': require('./root'),
  '/authentication': require('./authentication'),
  '/credit': require('./credit'),
  '/restaurant': require('./restaurant'),
  '/order': require('./order'),
};

// QUALITY_ATTRIBUTES Security Limit Exposure: only gateway routes expose to network and
// all services are in private network and not accessible from outside.
module.exports = (app) => {
  Object.keys(routes).forEach((path) => {
    app.use(`/api/v1${path}`, routes[path]);
  });
};

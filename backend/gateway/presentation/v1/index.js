const routes = {
  '': require('./root'),
  '/authentication': require('./authentication'),
  '/credit': require('./credit'),
  '/restaurant': require('./restaurant'),
};

module.exports = (app) => {
  Object.keys(routes).forEach((path) => {
    app.use(`/api/v1${path}`, routes[path]);
  });
};

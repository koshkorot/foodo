const express = require('express');
const v1 = require('./presentation/v1');
const middleware = require('./middleware');

const app = express();
app.set('view engine', 'pug');
middleware(app);
v1(app);

module.exports = app;

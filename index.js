const app = require('express')();
const webtask = require('webtask-tools');
const bodyParser = require('body-parser');
const routes = require('./routes');
const middlewares = require('./middlewares');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(middlewares.db);
routes(app);
app.use(middlewares.errorHandler);

module.exports = webtask.fromExpress(app);

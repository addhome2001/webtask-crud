const app = require('express')();
const webtask = require('webtask-tools');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');
const todosRoutes = require('./todos/routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(middlewares.db);
app.use('/todos', todosRoutes);
app.use(middlewares.errorHandler);

module.exports = webtask.fromExpress(app);

const app = require('express')();
const webtask = require('webtask-tools');
const bodyParser = require('body-parser');
const middleware = require('./middleware');
const todosRoutes = require('./todos/routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(middleware.db);
app.use('/todos', todosRoutes);
app.use(middleware.errorHandler);

module.exports = webtask.fromExpress(app);

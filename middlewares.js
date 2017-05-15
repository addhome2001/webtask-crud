const mongoose = require('mongoose');
const TodoSchema = require('./models/Todo');

module.exports.db = (req, res, next) => {
  const db = mongoose.createConnection(req.webtaskContext.secrets.MONGO_URL);
  req.todoModel = db.model('Todo', TodoSchema);
  req.on('close', () => {
    db.connection.close();
  });
  next();
}

module.exports.errorHandler = (req, res) => {
  res.status(500).send('fetch failure');
}

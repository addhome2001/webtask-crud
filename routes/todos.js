const mongoose = require('mongoose');

module.exports = app => {
  app.get('/todos', (req, res, next) => {
    req.todoModel
      .find({})
      .sort({ 'created_at': -1 })
      .exec((err, stories) => {
        if (err) return next();

        res.json(stories);
      });
  });

  app.post('/todos', (req, res) => {
    const newTodo = new req.todoModel(
      Object.assign({}, req.body, {
        checked: false,
        created_at: Date.now(),
      }),
    );

    newTodo.save((err, savedTodo) => {
      if (err) return next();

      res.json(savedTodo);
    });
  });

  app.put('/todos', (req, res) => {
    const idParam = req.webtaskContext.query.id;

    req.todoModel.findOneAndUpdate(
      { _id: idParam },
      req.body,
      { new: true },
      (err, newTodo) => {
        if (err) return next();

        res.json(newTodo);
      },
    );
  });

  app.delete('/todos', (req, res) => {
   const idParam = req.webtaskContext.query.id;

   req.todoModel.findByIdAndRemove(
     idParam,
     (err, removedTodo) => {
       if (err) return next();

       res.json(removedTodo);
     },
   );
 })
};

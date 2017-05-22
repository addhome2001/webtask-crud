const mongoose = require('mongoose');

module.exports = app => {
  app.route('/todos')
    .get((req, res, next) => {
      req.todoModel
        .find({})
        .sort({ 'created_at': 1 })
        .exec((err, stories) => {
          if (err) return next();

          res.json(stories);
        });
    })
    .post((req, res) => {
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
    })
    .delete((req, res) => {
      req.todoModel.remove(
        { checked: true },
        (err) => {
          if (err) return next();

          res.send(200);
        },
      );
    });

  app.route('/todos/:id')
    .put((req, res) => {
      const idParam = req.params.id;

      req.todoModel.findOneAndUpdate(
        { _id: idParam },
        req.body,
        { new: true },
        (err, newTodo) => {
          if (err) return next();

          res.json(newTodo);
        },
      );
    })
    .delete((req, res) => {
      const idParam = req.params.id;

      req.todoModel.findByIdAndRemove(
        idParam,
        (err, removedTodo) => {
          if (err) return next();

          res.json(removedTodo);
        },
      );
    });
};

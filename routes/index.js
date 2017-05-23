const express = require('express');
const router = express.Router();

module.exports = app => {

  router.get('/', (req, res, next) => {
    req.todoModel
      .find({})
      .sort({ 'created_at': 1 })
      .exec((err, stories) => {
        if (err) return next();

        res.json(stories);
      });
  });

  router.post('/', (req, res) => {
    const { content = {} } = req.body || {};

    if (content && content.length > 0) {
      const newTodo = new req.todoModel({
        content,
        checked: false,
        created_at: Date.now(),
      });

      newTodo.save((err, savedTodo) => {
        if (err) return next();

        res.json(savedTodo);
      });
    } else {
      return next();
    }
  });

  router.delete('/', (req, res) => {
    req.todoModel.remove(
      { checked: true },
      (err) => {
        if (err) return next();

        res.send(200);
      },
    );
  });

  router.put('/:id', (req, res) => {
    const { id } = req.params || {};
    const { checked, content } = req.body || {};

    if (id) {
      req.todoModel.findOneAndUpdate(
        { _id: id },
        Object.assign({},
          checked !== undefined && { checked },
          content !== undefined && { content },
        ),
        { new: true },
        (err, newTodo) => {
          if (err) return next();

          res.json(newTodo);
        },
      );
    } else {
      return next();
    }
  });

  router.delete('/:id', (req, res) => {
    const { id } = req.params || {};

    if (id) {
      req.todoModel.findByIdAndRemove(
        id,
        (err, removedTodo) => {
          if (err) return next();

          res.json(removedTodo);
        },
      );
    } else {
      return next();
    }
  });

  app.use('/todos', router);
};

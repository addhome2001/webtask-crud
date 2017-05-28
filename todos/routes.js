const express = require('express');
const router = express.Router();
const Todos = require('./schema');

router.get('/', (req, res, next) => {
  Todos.findAllTodos((err, todos) => {
    if (err) return next();

    res.json(todos);
  });
});

router.post('/', (req, res) => {
  const { content } = req.body || {};

  if (content && content.length > 0) {
    Todos.addNewTodo(content, (err, savedTodo) => {
      if (err) return next();

      res.json(savedTodo);
    });
  } else {
    return next();
  }
});

router.delete('/checked', (req, res) => {
  Todos.removeAllTodos(err => {
    if (err) return next();

    res.send(200);
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params || {};
  const { checked, content } = req.body || {};

  if (id) {
    const payload = Object.assign({},
      checked !== undefined && { checked },
      content !== undefined && { content },
    );
    Todos.updateTodo(id, payload, (err, updatedTodo) => {
      if (err) return next();

      res.json(updatedTodo);
    });
  } else {
    return next();
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params || {};

  if (id) {
    Todos.removeTodo(id, (err, removedTodo) => {
      if (err) return next();

      res.json(removedTodo);
    });
  } else {
    return next();
  }
});

module.exports = router;

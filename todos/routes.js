const express = require('express');
const uuidv1 = require('uuid/v1');
const router = express.Router();

router.get('/', (req, res, next) => {
  req.webtaskContext.storage.get((error, todos = []) => {
    if (error) next(error);

    res.json(todos);
  });
});

router.post('/', (req, res, next) => {
  const { content } = req.body || {};

  if (content && content.length > 0) {
    const newTodo = {
      _id: uuidv1(),
      content,
      checked: false,
    };

    req.webtaskContext.storage.get((error, todos = []) => {
      if (error) next(error);

      const newTodos = todos.concat(newTodo);

      req.webtaskContext.storage.set(newTodos, (error) => {
        if (error) next(error);

        res.json(newTodo);
      });
    });
  } else {
    return next();
  }
});

router.delete('/checked', (req, res) => {
  req.webtaskContext.storage.get((error, todos) => {
    if (error) next(error);

    const newTodos = todos.filter(({ checked }) => !checked);

    req.webtaskContext.storage.set(newTodos, (error) => {
      if (error) next(error);

      res.send(200);
    });
  });
});

router.put('/:id', (req, res, next) => {
  const { id } = req.params || {};
  const { checked, content } = req.body || {};

  if (id) {
    req.webtaskContext.storage.get((error, todos) => {
      if (error) next(error);

      const todo = todos.find(todo => todo._id === id);
      const newTodo = {
        ...todo,
        checked: checked === undefined ? todo.checked : checked,
        content: content === undefined ? todo.content : content,
      };
      const newTodos = todos.map(
        todo => todo._id === id ? newTodo : todo
      );

      req.webtaskContext.storage.set(newTodos, (error) => {
        if (error) next(error);

        res.json(newTodo);
      });
    });
  } else {
    return next();
  }
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params || {};

  if (id) {
    req.webtaskContext.storage.get((error, todos) => {
      if (error) next(error);

      const removedTodo = todos.find(todo => todo._id === id);
      const newTodos = todos.filter(todo => todo._id !== id);

      req.webtaskContext.storage.set(newTodos, (error) => {
        if (error) next(error);

        res.json(removedTodo);
      });
    });
  } else {
    return next();
  }
});

module.exports = router;

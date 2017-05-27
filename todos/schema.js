const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  content: String,
  checked: Boolean,
  created_at: Date,
  id: mongoose.Schema.ObjectId
});

TodoSchema.statics = {
  findAllTodos(cb) {
    return this.find().sort({ 'created_at': 1 }).exec(cb);
  },

  addNewTodo(content, cb) {
    const newTodo = new this({
      content,
      checked: false,
      created_at: Date.now(),
    });
    newTodo.save(cb);
  },

  updateTodo(_id, payload, cb) {
    return this.findOneAndUpdate({ _id }, payload, { new: true }, cb);
  },

  removeTodo(id, cb) {
    return this.findByIdAndRemove(id, cb);
  },

  removeAllTodos(cb) {
    return this.remove({ checked: true }, cb);
  }
}

module.exports = mongoose.model('Todo', TodoSchema);

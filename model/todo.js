import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  typ: String,
  name: String,
  datum: String,
  inhalt: String,
  farbe: String
});

const todo = mongoose.model('Todo', TodoSchema);
export default todo;

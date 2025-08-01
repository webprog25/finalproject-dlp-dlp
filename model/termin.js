import mongoose from 'mongoose';

const TerminSchema = new mongoose.Schema({
  typ: String,
  name: String,
  datum: String,
  uhrzeit: String,
  inhalt: String,
  farbe: String
});

const termin = mongoose.model('Termin', TerminSchema);
export default termin;
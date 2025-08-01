import mongoose from 'mongoose';

const WocheneintragSchema = new mongoose.Schema({
  typ: String,
  name: String,
  datum: String,
  beginn: String,
  ende: String,
  inhalt: String,
  farbe: String
});

const wocheneintrag = mongoose.model('Wocheneintrag', WocheneintragSchema);
export default wocheneintrag;

//Hilfestellung chatGPT: Code komplett übernommen. Ich habe lediglich den DB-Namen angepasst.

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/eintraegeDB', {
    });
    console.log('MongoDB verbunden');
  } catch (err) {
    console.error('MongoDB-Fehler:', err);
    process.exit(1);
  }
};

export default connectDB;

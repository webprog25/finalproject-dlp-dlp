/* Hilfestellung chatGPT: Code komplett übernommen. Ich habe lediglich Anpassungen
bei den jeweiligen Stellen vorgenommen, um die korrekten Beziehungen herzustellen */

import connectDB from '../db.js';
import wocheneintrag from '../model/wocheneintrag.js';
import termin from '../model/termin.js';
import todo from '../model/todo.js';

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

/* Daten lokal bearbeiten und speichern mit json-Datei
import fs from 'fs';
import path from 'path';
*/

// Initialisierung und Middleware
const api = express.Router();
const initApi = async (app) => {
  await connectDB();
  
  app.set("json spaces", 2);
  app.use("/api", api);

  
  /*Pfad zur JSON-Datei
  const dirname = process.cwd();
  const datenPfad = path.join(dirname, 'daten.json');
  */ 

  api.use(bodyParser.json());
  api.use(cors());

  // POST: Eintrag in mongoDatenbank speichern
  api.post('/wochenplan', async (req, res) => {
    try {
      const wochenItem = new wocheneintrag(req.body);
      await wochenItem.save();
      res.status(201).json({ message: 'Wocheneintrag gespeichert' });
    } catch (err) {
      res.status(500).json({ error: 'Fehler beim Speichern' });
    }
  });

  api.post('/termin', async (req, res) => {
    try {
      const terminItem = new termin(req.body);
      await terminItem.save();
      res.status(201).json({ message: 'Termin gespeichert' });
    } catch (err) {
      res.status(500).json({ error: 'Fehler beim Speichern' });
    }
  });

  api.post('/todo', async (req, res) => {
    try {
      const todoItem = new todo(req.body);
      await todoItem.save();
      res.status(201).json({ message: 'Todo gespeichert' });
    } catch (err) {
      res.status(500).json({ error: 'Fehler beim Speichern' });
    }
  });

    // GET: Einträge nach Kategorie abrufen
    api.get('/wochenplan', async (req, res) => {
      try {
        const wochenItem = await wocheneintrag.find({});
        res.json(wochenItem);
      } catch (err) {
        console.error('Fehler beim Abrufen aus MongoDB:', err);
        res.status(500).send('Fehler beim Abrufen der Daten');
      }
    });

     api.get('/termine', async (req, res) => {
      try {
        const terminItem = await termin.find({});
        res.json(terminItem);
      } catch (err) {
        console.error('Fehler beim Abrufen aus MongoDB:', err);
        res.status(500).send('Fehler beim Abrufen der Daten');
      }
    });

    api.get('/todos', async (req, res) => {
      try {
        const todoItem = await todo.find({});
        res.json(todoItem);
      } catch (err) {
        console.error('Fehler beim Abrufen aus MongoDB:', err);
        res.status(500).send('Fehler beim Abrufen der Daten');
      }
    });

    // GET: Alle Einträge abrufen
    api.get('/eintraege', async (req, res) => {
      try {
        const [termineData, todosData, wocheneintraegeData] = await Promise.all([
          termin.find(),
          todo.find(),
          wocheneintrag.find()
        ]);

        res.json({
          termine: termineData,
          todos: todosData,
          wocheneintraege: wocheneintraegeData
        });
      } catch (err) {
        console.error('Fehler beim Laden der Einträge:', err);
        res.status(500).json({ error: 'Fehler beim Laden' });
      }
    });


  // GET: Einträge abrufen, nach Namen filtern
 api.get('/eintraege/name/:name', async (req, res) => {
  const name = req.params.name;

  try {
    // Alle drei Abfragen parallel starten
    const [wochen, termine, todos] = await Promise.all([
      wocheneintrag.find({ name }),
      termin.find({ name }),
      todo.find({ name })
    ]);

    // Antwort strukturieren
    res.json({
      name: name,
      wocheneintraege: wochen,
      termine: termine,
      todos: todos
    });
  } catch (err) {
    console.error('Fehler beim Filtern nach Name:', err);
    res.status(500).send('Fehler beim Abrufen der Daten');
  }
});

  /*
  //POST: Speichern als json-Einträgen
  api.post('/eintrag', (req, res) => {
    const daten = req.body;
    console.log('Empfangene Daten:', daten);

    // Datei lesen oder leeres Array initialisieren
    fs.readFile(datenPfad, 'utf8', (err, fileData) => {
      let eintraege = [];
      if (!err && fileData) {
        try {
          eintraege = JSON.parse(fileData);
        } catch (parseErr) {
          console.error('Fehler beim Parsen von daten.json:', parseErr);
        }
      }

      // Neuen Eintrag hinzufügen
      eintraege.push(daten);

      // Datei speichern
      fs.writeFile(datenPfad, JSON.stringify(eintraege, null, 2), (writeErr) => {
        if (writeErr) {
          console.error('Fehler beim Speichern:', writeErr);
          return res.status(500).send('Fehler beim Speichern');
        }

        res.status(200).send('Daten gespeichert');
      });
    });
  });

  //GET: Einträge abrufen
  api.get('/eintraege', (req, res) => {
    fs.readFile(datenPfad, 'utf8', (err, fileData) => {
      if (err) {
        return res.status(500).send('Fehler beim Lesen der Datei');
      }

      try {
        const eintraege = JSON.parse(fileData);
        res.json(eintraege);
      } catch (parseErr) {
        res.status(500).send('Fehler beim Parsen der Datei');
      }
    });
  });

  
  //GET: Filtern nach Namen
   api.get('/eintraege/name/:name', (req, res) => {
    const name = req.params.name;

    fs.readFile(datenPfad, 'utf8', (err, fileData) => {
      if (err) {
        console.error('Fehler beim Lesen:', err);
        return res.status(500).send('Fehler beim Lesen der Datei');
      }

      try {
        const eintraege = JSON.parse(fileData);
        const gefilterteEintraege = eintraege.filter(e => e.name === name);
        res.json(gefilterteEintraege);
      } catch (parseErr) {
        console.error('Fehler beim Parsen:', parseErr);
        res.status(500).send('Fehler beim Parsen der Datei');
      }
    });
  });
  */

  api.get("/", (req, res) => {
    res.json({ message: "Hello, world!" });
  });

  /* Catch-all route to return a JSON error if endpoint not defined.
  Be sure to put all of your endpoints above this one, or they will not be called. */
  api.all("/*", (req, res) => {
    res.status(404).json({ error: `Endpoint not found: ${req.method} ${req.url}` });
  });
};

export default initApi;
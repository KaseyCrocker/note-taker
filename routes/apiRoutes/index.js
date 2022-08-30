const path = require('path');
const fs = require('fs')
const allNotes = require('../../db/db.json');

var uniqid = require('uniqid');

function createNewNote(body, notesArray) {
  const newNote = body;
  if (!Array.isArray(notesArray))
      notesArray = [];
  
  if (notesArray.length === 0)
      notesArray.push(0);

  body.id = notesArray[0];
  notesArray[0]++;

  notesArray.push(newNote);
  fs.writeFileSync(
      path.join(__dirname, '../../db/db.json'),
      JSON.stringify(notesArray, null, 2)
  );
  return newNote;
}

module.exports = (app) => {

    app.get('/api/notes', (req, res) => {
      res.sendFile(path.join(__dirname, '../../db/db.json'));
    });
  
    app.post('/api/notes', (req, res) => {
      const newNote = createNewNote(req.body, allNotes);
      res.json(newNote);
    });
  
  
    app.delete('/api/notes/:id', (req, res) => {
      let db = JSON.parse(fs.readFileSync('db/db.json'))
      let deleteNotes = db.filter(item => item.id !== req.params.id);
      fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
      res.json(deleteNotes);
      
    })
  };
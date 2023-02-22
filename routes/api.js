const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

// GET Route for retrieving all the notes
// http://localhost:3001/api/notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});
// http://localhost:3001/api/notes/21312312312
// DELETE Route for a specific notes
notes.delete('/:id', (req, res) => {
  const notesId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one with the ID provided in the URL
      const result = json.filter((notes) => notes.id !== notesId);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(result);
    });
});

// POST Route for a new UX/UI notes
notes.post('/', (req, res) => {
  console.log(req.body);

  const {title,text } = req.body;

  if (req.body) {
    const newnotes = {
      id: uuidv4(),
      title,
      text,
    };

   const parsedData= readAndAppend(newnotes, './db/db.json')
   console.log(parsedData)
    res.json(parsedData);
  } else {
    res.error('Error in adding notes');
  }
});

module.exports = notes;

const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT =  process.env .PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
// GET request for reviews
app.get('/api/notes', (req, res) => {
  fs.readFile('./db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // Convert string into JSON object
      const parsedReviews = JSON.parse(data);
      res.json(parsedReviews)
    }
  })
});
// POST request to add a review
app.post('/api/notes', (req, res) => {
  
const newNote = req.body
  // Destructuring assignment for the items in req.body
  
    // Obtain existing reviews
    fs.readFile('./db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

         // Add a new review
         parsedNotes.push(newNote);

         // Write updated reviews back to the file
         fs.writeFile(
           './db.json',
           JSON.stringify(parsedNotes, null, 4),
           (writeErr) =>
             writeErr
               ? res.status(500).json(writeErr)
               : res.status(201).json(parsedNotes)
         );
       }
     });
 
     
   
 });
 
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
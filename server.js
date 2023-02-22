const express = require('express');
const path = require('path');
const api = require('./routes/index')

// Initialize app variable
const app =express()
// port number for page
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api)
// http://localhost:3001/api
// a static middle wear
app.use(express.static('public'));

// GET request for index.html (main page)
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, "/public/index.html"))
)
// GET request for notes.html (notes page)
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, './public/notes.html'))
);


// listening on port
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})
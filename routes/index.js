// connecting express
const express = require('express');
// Creating new Route
const notesRouter = require('./api.js');
// Activating express
const app=express()
// New Route created for notes
app.use('/notes', notesRouter);
// http://localhost:3001/api/notes


module.exports = app;

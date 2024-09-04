const connectDB = require("./mongodb");
const mongoose = require('mongoose');

// Define the ThesisSchema
const ThesisSchema = new mongoose.Schema({
  titlename: String,
  category: String,
  year: Number,
  filename: String,
  path: String,
  dateuploaded: {
    type: Date,
    default: Date.now
  }
});


// Create the ThesisCollection model
const ThesisCollection = mongoose.model('ThesisCollection', ThesisSchema);

module.exports = ThesisCollection;

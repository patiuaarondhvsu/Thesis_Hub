const mongoose = require('mongoose');

// Define the RcdSchema
const RCDSchema = new mongoose.Schema({
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

  // Create the RcdCollection model
const RCDCollection = mongoose.model('RCDCollection', RCDSchema);

module.exports = RCDCollection;
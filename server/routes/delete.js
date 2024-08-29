// routes/thesisRoutes.js
const express = require('express');
const router = express.Router();
const thesisCollection = require('../models/thesisModel'); // Update path as needed
const rcd = require('../src/rcd'); // Update path as needed

// Delete route
router.delete('/thesis/:id', async (req, res) => {
  try {
    const thesisId = req.params.id;
    
    // Find the thesis to be deleted
    const thesis = await thesisCollection.findById(thesisId);
    
    if (!thesis) {
      return res.status(404).json({ message: 'Thesis not found' });
    }

    // Create a backup record
    const backupRecord = new rcd({
      titlename: thesis.titlename,
      category: thesis.category,
      year: thesis.year,
      filename: thesis.filename,
      path: thesis.path
    });
    
    await backupRecord.save();

    // Delete the original thesis record
    await thesisCollection.findByIdAndDelete(thesisId);
    
    res.status(200).json({ message: 'Thesis deleted and backup created' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;

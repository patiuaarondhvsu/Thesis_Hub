// backend/routes/thesisRoutes.js
const express = require('express');
const ThesisCollection = require('../models/ThesisCollection');

const router = express.Router();

// Get all theses
router.get('/', async (req, res) => {
  try {
    const theses = await ThesisCollection.find();
    res.json(theses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add a new thesis
router.post('/', async (req, res) => {
  try {
    const { title, author, year } = req.body;
    const newThesis = new ThesisCollection({
      titlename: title,
      author,
      year,
    });
    const savedThesis = await newThesis.save();
    res.json(savedThesis);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Edit a thesis
router.put('/:id', async (req, res) => {
  try {
    const updatedThesis = await ThesisCollection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedThesis);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a thesis
router.delete('/:id', async (req, res) => {
  try {
    await ThesisCollection.findByIdAndDelete(req.params.id);
    res.json({ message: 'Thesis deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;

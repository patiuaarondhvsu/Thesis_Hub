const { Router } = require('express');
const router = Router();
const multer = require('multer');
const ThesisCollection = require('../src/thesisdb'); // Ensure this path is correct
const RCDCollection = require('../src/rcd'); // Ensure this path is correct

// Multer Configuration for In-Memory Storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Handle form submission with file upload for editing
router.put('/api/edit/:id', upload.single('thesisPDF'), async (req, res) => {
  try {
    const { id } = req.params; // Thesis ID from the URL parameters
    const { titlename, category, year, author } = req.body;

    // Ensure thesis ID and required fields are provided
    if (!id || !titlename || !category || !year || !author) {
      return res.status(400).json({ message: 'ID and all other fields are required.' });
    }

    // Find the thesis document by ID
    const thesis = await ThesisCollection.findById(id);
    if (!thesis) {
      return res.status(404).json({ message: 'Thesis not found.' });
    }

    // Update thesis details
    thesis.titlename = titlename;
    thesis.category = category;
    thesis.year = year;
    thesis.author = author;

    // Check if a new file is provided
    if (req.file) {
      thesis.filename = req.file.originalname;
      thesis.fileBuffer = req.file.buffer.toString('base64'); // Ensure this is appropriate for your use case
    }

    // Save updated Thesis document to MongoDB
    const updatedThesis = await thesis.save();

    // Find and update the corresponding RCD entry
    const rcd = await RCDCollection.findOne({ thesisId: id });
    if (rcd) {
      rcd.uploadDate = new Date();
      await rcd.save();
    }

    // Send a success response
    res.json({ message: 'Thesis updated and RCD entry updated successfully!' });
  } catch (err) {
    // Handle error
    console.error('Error handling edit:', err);
    res.status(500).json({ message: 'Error processing edit' });
  }
});

module.exports = router;

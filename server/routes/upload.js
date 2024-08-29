const { Router } = require('express');
const router = Router();
const multer = require('multer');
const ThesisCollection = require('../src/thesisdb'); // Ensure this path is correct
const RCDCollection = require('../src/rcd'); // Ensure this path is correct

// Multer Configuration for In-Memory Storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Handle form submission with file upload
router.post('/upload', upload.single('thesisPDF'), async (req, res) => {
  try {
    const { titlename, category, year } = req.body;

    // Ensure all required fields are provided
    if (!titlename || !category || !year || !req.file) {
      return res.status(400).send('All fields are required.');
    }

    // Create a new Thesis document
    const newThesis = new ThesisCollection({
      titlename,
      category,
      year,
      filename: req.file.originalname, // Store the original filename
      // Store the file buffer as base64 or use an appropriate storage mechanism
      fileBuffer: req.file.buffer.toString('base64') // Convert buffer to base64 string (consider file storage alternatives)
    });

    // Save to MongoDB
    await newThesis.save();
    
    // Create a new Thesis RCD document
    const newRCDThesis = new RCDCollection({
      titlename,
      category,
      year,
      filename: req.file.originalname, // Store the original filename
      // Store the file buffer as base64 or use an appropriate storage mechanism
      fileBuffer: req.file.buffer.toString('base64') // Convert buffer to base64 string (consider file storage alternatives)
    });

    // Save to MongoDB
    await newRCDThesis.save();

    // Send a success response
    res.render('adminhome', { message: 'File uploaded and data saved successfully!' });
  } catch (err) {
    // Handle error
    console.error('Error saving thesis:', err);
    res.status(500).send('Error saving thesis');
  }
});

module.exports = router;

const express = require('express');
const { Router } = require('express');
const mongoose = require('mongoose');

const router = Router();

// Define a schema for log entries
const logSchema = new mongoose.Schema({
    message: String,
    timestamp: Date
}, { collection: 'logEntries' });  // Ensure this matches the collection name in `logger.js`

const Log = mongoose.model('Log', logSchema);

// Get all logs
router.get('/logs', async (req, res) => {
    try {
        const logs = await Log.find().sort({ timestamp: -1 });
        res.json(logs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while retrieving logs.' });
    }
});

module.exports = router;

const winston = require('winston');
require('winston-mongodb');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.Console(),
        new winston.transports.MongoDB({
            db: 'mongodb+srv://ThesisHub:IT56Boys@thesishubcluster.xl367m4.mongodb.net/Database',
            collection: 'logEntries',  // Ensure this matches the collection name in `logs.js`
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            options: {
                useUnifiedTopology: true
            }
        })
    ],
});

module.exports = logger;

const { MongoClient, ObjectId } = require('mongodb');

let cachedDb = null;

// Ensure the MongoDB URI is defined
if (!process.env.MONGODB_URI) {
    throw new Error('The MONGODB_URI environment variable is not defined.');
}

// Ensure the MongoDB database name is defined
if (!process.env.MONGODB_NAME) {
    throw new Error('The MONGODB_NAME environment variable is not defined.');
}

// Connect to MongoDB with connection pooling
async function connectToDB() {
    if (cachedDb) {
        return cachedDb;
    }
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db(process.env.MONGODB_NAME);
    cachedDb = db;
    return db;
}

// Middleware to attach db connection to the request
async function withDB(req, res, next) {
    try {
        if (!req.db) {
            req.db = await connectToDB();
        }
        next();
    } catch (err) {
        console.error('Failed to connect to the database:', err);
        res.status(500).json({ message: 'Error connecting to database' });
    }
}

module.exports = { ObjectId, withDB };

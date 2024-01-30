const { MongoClient, ObjectId } = require('mongodb');

if (!process.env.MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Connect to MongoDB
async function connectToDB() {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db('acuella');
    db.client = client;
    return db;
}

async function withDB(req, res, next) {
    try {
      req.db = await connectToDB();
      next();
    } catch (err) {
      res.status(500).json({ message: "Error connecting to database" });
    }
  }

module.exports = { ObjectId, withDB };
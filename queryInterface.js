const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 4000;

mongoose.connect('mongodb://localhost:27017/logDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Log = mongoose.model('Log', {
  level: String,
  message: String,
  resourceId: String,
  timestamp: Date,
  traceId: String,
  spanId: String,
  commit: String,
  metadata: {
    parentResourceId: String,
  },
});

app.use(bodyParser.json());

// Search logs based on the parameters
app.get('/search', async (req, res) => {
  try {
    const searchTerm = req.query.query; // assuming 'query' parameter for the search term
    const results = await Log.find({
      $text: { $search: searchTerm },
    });
    res.json(results);
  } catch (error) {
    res.status(500).send('Error searching logs');
  }
});

// Filtering logs based on specified fields
app.get('/filter', async (req, res) => {
  try {
    const filters = req.query;
    const results = await Log.find(filters);
    res.json(results);
  } catch (error) {
    res.status(500).send('Error filtering logs');
  }
});
// for timestamp based filtering 
app.get('/logs/timestamp/:start/:end', async (req, res) => {
  try {
    const start = new Date(req.params.start);
    const end = new Date(req.params.end);
    const logs = await Log.find({ timestamp: { $gte: start, $lte: end } });
    res.json(logs);
  } catch (error) {
    res.status(500).send('Error fetching logs by timestamp range');
  }
});
app.listen(PORT, () => {
  console.log(`Query Interface running on port ${PORT}`);
});


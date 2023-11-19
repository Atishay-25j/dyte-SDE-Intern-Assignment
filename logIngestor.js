const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// MongoDB connection setup
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
// handling logs
app.post('/logs', async (req, res) => {
  try {
    const log = new Log(req.body);
    await log.save();
    res.status(201).send('Log saved successfully');
  } catch (error) {
    res.status(500).send('Error saving log');
  }
});

app.listen(PORT, () => {
  console.log(`Log Ingestor running on port ${PORT}`);
});

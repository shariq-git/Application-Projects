// Backend: Node.js with Express.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bikeService', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Mongoose Schema
const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  bikeModel: { type: String, required: true },
  issue: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Enquiry = mongoose.model('Enquiry', enquirySchema);

// API Endpoints
app.post('/api/enquiry', async (req, res) => {
  try {
    const enquiry = new Enquiry(req.body);
    await enquiry.save();
    res.status(201).json({ message: 'Enquiry saved successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/enquiries', async (req, res) => {
  try {
    const enquiries = await Enquiry.find();
    res.status(200).json(enquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


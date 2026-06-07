const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Enhanced CORS for web
app.use(cors({
  origin: '*', // Allow all origins for development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Simple JSON file storage (no MongoDB needed for MVP)
const DATA_FILE = path.join(__dirname, 'schemes.json');

// Read schemes
app.get('/api/schemes', (req, res) => {
  const { occupation } = req.query;
  const schemes = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  
  if (occupation) {
    const filtered = schemes.filter(scheme => 
      scheme.occupations?.includes(occupation) || 
      scheme.category?.toLowerCase() === occupation.toLowerCase()
    );
    return res.json(filtered);
  }
  
  res.json(schemes);
});

// Get single scheme
app.get('/api/schemes/:id', (req, res) => {
  const schemes = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  const scheme = schemes.find(s => s.id === parseInt(req.params.id));
  res.json(scheme);
});

// Get all occupations/categories
app.get('/api/occupations', (req, res) => {
  const occupations = [
    { id: 'farmer', name: 'Farmer', icon: '👨‍🌾' },
    { id: 'student', name: 'Student', icon: '📚' },
    { id: 'women', name: 'Women', icon: '🙋‍♀️' },
    { id: 'senior', name: 'Senior Citizen', icon: '🧓' },
    { id: 'entrepreneur', name: 'Entrepreneur', icon: '💼' },
    { id: 'jobseeker', name: 'Job Seeker', icon: '💼' },
    { id: 'scst', name: 'SC/ST', icon: '🔰' },
    { id: 'solar', name: 'Solar Energy', icon: '☀️' },  // Added Solar Energy
    { id: 'healthcare', name: 'Healthcare', icon: '🏥' },  // Added Healthcare
    { id: 'housing', name: 'Housing', icon: '🏠' },  // Added Housing
    { id: 'sports', name: 'Sports', icon: '⚽' }  // Added Sports
    // Removed Fisherman
  ];
  res.json(occupations);
});

// Sync from government sources (scraper endpoint)
app.post('/api/admin/sync', async (req, res) => {
  res.json({ message: 'Sync initiated' });
});

app.listen(5000, () => {
  console.log('🚀 E-Yojna Backend running on port 5000');
  console.log('📡 Endpoints:');
  console.log('   GET http://localhost:5000/api/schemes');
  console.log('   GET http://localhost:5000/api/occupations');
});
// C:\E-Yojna\Server\server-simple.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.json({ 
        message: 'E-Yojna Backend Running',
        mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
    });
});

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Schemes route
app.get('/api/schemes', async (req, res) => {
    try {
        // Check if we have a Scheme model
        let Scheme;
        try {
            Scheme = mongoose.model('Scheme');
        } catch (e) {
            // Create a temporary model if it doesn't exist
            const schemeSchema = new mongoose.Schema({
                title: String,
                description: String,
                ministry: String,
                category: String,
                benefits: String,
                eligibility: String,
                tags: [String],
                source: String,
                lastUpdated: Date
            }, {
                timestamps: true
            });
            Scheme = mongoose.model('Scheme', schemeSchema);
        }
        
        const schemes = await Scheme.find();
        console.log(`Found ${schemes.length} schemes`);
        res.json(schemes);
    } catch (error) {
        console.error('Error fetching schemes:', error);
        res.status(500).json({ error: error.message });
    }
});

// Fetch schemes route (placeholder)
app.get('/api/schemes/fetch', async (req, res) => {
    res.json({ message: 'Scheme fetching endpoint - implement your scraper here' });
});

// Connect to MongoDB Atlas - NO deprecated options
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    console.log('📁 Database:', mongoose.connection.name);
    
    // Start server only after database connection
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`📡 Test URL: http://localhost:${PORT}/api/test`);
        console.log(`📊 Schemes URL: http://localhost:${PORT}/api/schemes`);
    });
})
.catch(err => {
    console.error('❌ MongoDB Connection Failed:', err.message);
    console.log('\n🔧 Please check:');
    console.log('1. Network Access in MongoDB Atlas (add 0.0.0.0/0)');
    console.log('2. Username and password in .env file');
    console.log('3. Database name "eyojna" exists');
    process.exit(1);
});
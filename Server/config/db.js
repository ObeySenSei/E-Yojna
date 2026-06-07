// C:\E-Yojna\Server\config\db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Remove useNewUrlParser and useUnifiedTopology - they're no longer needed
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`📁 Database: ${conn.connection.name}`);
        
        // Handle connection events
        mongoose.connection.on('error', err => {
            console.error('MongoDB connection error:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });
        
        return conn;
        
    } catch (error) {
        console.error('❌ MongoDB Connection Failed:', error.message);
        console.error('Please check:');
        console.error('1. Your MongoDB Atlas username/password');
        console.error('2. Network whitelist (0.0.0.0/0 for testing)');
        console.error('3. Connection string format');
        
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;
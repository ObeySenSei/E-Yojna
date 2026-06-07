const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
    title: String,
    description: String,
    ministry: String,
    category: String,
    benefits: String,
    eligibility: String,
    tags: [String],
    source: String
}, { timestamps: true });

module.exports = mongoose.model('Scheme', schemeSchema);
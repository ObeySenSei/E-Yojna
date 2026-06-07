// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Fix for web MIME type issues
config.resolver.assetExts.push(['cjs']);

module.exports = config;
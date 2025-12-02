// Vercel serverless function entry point
// This file wraps the Express app for Vercel deployment

const app = require('../src/server');

// Export the Express app as a serverless function
module.exports = app;


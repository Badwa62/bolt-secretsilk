// backend/src/utils/analyticsCollector.js

const fs = require('fs');
const path = require('path');

// Path to store analytics data
const analyticsFilePath = path.join(__dirname, '../../data/analytics.json');

// Collect data for personalization
const collectAnalytics = (eventType, userId, additionalData = {}) => {
  const timestamp = new Date().toISOString();
  const dataEntry = { eventType, userId, timestamp, ...additionalData };

  fs.readFile(analyticsFilePath, 'utf8', (err, data) => {
    if (err && err.code !== 'ENOENT') {
      console.error('Error reading analytics file:', err);
      return;
    }

    const analyticsData = data ? JSON.parse(data) : [];
    analyticsData.push(dataEntry);

    fs.writeFile(analyticsFilePath, JSON.stringify(analyticsData, null, 2), (err) => {
      if (err) {
        console.error('Error writing analytics data:', err);
      }
    });
  });
};

module.exports = { collectAnalytics };

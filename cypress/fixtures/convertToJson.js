const fs = require('fs');
const path = require('path');
const jsonData = require('./SignUpData.json');

// Resolve the full path to the JavaScript file
const jsFilePath = path.resolve(__dirname, 'D:/QC_Automation test/cypress/fixtures/convertToJson.js');

// Read JSON data from file
const jsonData = require(jsFilePath);

// Convert JSON to CSV
const csvData = jsonData.map(entry => {
    return `${entry.fullname},${entry.email},${entry.password}`;
}).join('\n');

// Write CSV data to file
fs.writeFileSync('output.csv', csvData);

console.log('CSV data has been written to output.csv');
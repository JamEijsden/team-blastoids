const express = require('express');
const path = require('path');
const https = require('https');
const bodyParser = require('body-parser');
const compression = require('compression');
const fs = require('fs');
const allowed = [
  '.js',
  '.css',
  '.png',
  '.jpg'
];

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, './dist')));
app.use(compression());
// Catch all other routes and return the index file
app.get('*', (req, res) => {
  if (allowed.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
    res.sendFile(path.resolve(`../dist/webapp/${req.url}`));
  } else {
    res.sendFile(path.join(__dirname, '../dist/webapp/index.html'));
  }
});

/**
 * Get port from environment and store in Express.
 */
let defaultPort = process.argv.length < 3 ? 80 : process.argv[2];

const port = process.env.PORT ||  defaultPort;
app.set('port', port);

/**
 * Create HTTP server.
 */
 
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`Frontend running on localhost:${port}`));


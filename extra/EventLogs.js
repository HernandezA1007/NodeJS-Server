const express = require('express');
const app = express();
const eventLogs = require('./EventLogs');
const port = 3000;

// app.use(eventLogs);

function logEvent(eventType, fileName) {
    console.log(`[${new Date().toISOString()}] ${eventType}: ${fileName}`);
}

function EventLogs(req, res, next) {
    logEvent('REQUEST', req.url);
    next();
}

function serveImage(req, res) {
    const imagePath = `./images${req.url}`;
    if (fs.existsSync(imagePath)) {
      logEvent('SERVE', imagePath);
      fs.readFile(imagePath, function(err, data) {
        if (err) {
          logEvent('ERROR', imagePath);
          res.writeHead(500);
          res.end();
        } else {
          res.writeHead(200, {'Content-Type': 'image/jpeg'});
          res.end(data);
        }
      });
    } else {
      logEvent('NOT FOUND', imagePath);
      res.writeHead(404);
      res.end();
    }
  }


// app.listen(port, () => {
//     console.log(`Server started on port ${port}`);
// });

module.exports = { EventLogs, serveImage };
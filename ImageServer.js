// Antonio Hernandez
// INF 653
// Muvva
// 4 - 7 - 23


// Provided any modules that could be used
const http = require('http');
const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;
const { format } = require('date-fns');
const { v4: uuidv4 } = require('uuid');

const server = http.createServer((req, res) => {    // create server
    const filePath = path.join(__dirname, 'images', req.url);
    
    if (!fs.existsSync(filePath)) {
        res.status(404);
        res.end('File not found');
        return;
    }
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end('Server error');
          return;
        }
    
        const extname = path.extname(filePath); // extension...
        let contentType = 'text/plain';
        switch (extname) {
          case '.jpg':
            contentType = 'image/jpeg'; // my images example are jpg
            break;
          case '.png':
            contentType = 'image/png';
            break;
          case '.gif':
            contentType = 'image/gif';
            break;
        }

    // Log the events
    const eventLog = `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')} - Requested file: ${req.url} - File type: ${contentType} - Request ID: ${uuidv4()}`;
    console.log(eventLog);

    res.setHeader('Content-Type', contentType);
    res.end(data);

    });
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
  });
// Antonio Hernandez
// INF 653
// Muvva
// 4 - 7 - 23

// Using express for image assignment
const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

const { EventLogs, serveImage } = require('./logs');

app.use(EventLogs);

app.get('*.jpg', serveImage); // I only use jpg image files

fs.readFile(`images/${fileName}`, (error, data) => {
    if (error) {
      // handle error
    } else {
      response.writeHead(200, { 'Content-Type': 'image/jpeg' });
      response.end(data);
    }
  });


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`); // can just put 3000 here
});
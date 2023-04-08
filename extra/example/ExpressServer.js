// Antonio Hernandez
// INF 653
// Muvva
// 4 - 7 - 23

const express = require('express');     // express module
const path = require('path');
const app = express();      
const PORT = process.env.PORT || 3000;
const fs = require('fs');       // file system module
const fsPromises = require('fs').promises;

// const EventLogs = require('./middleware/EventLogs');
const { logger } = require('./middleware/EventLogs');

app.use(logger);

app.use(express.static(path.join(__dirname, '/images')));
app.use(express.json());

app.get("^/$|index.html", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

// checks if file exists
app.get('/images', (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(__dirname, '/images', fileName);

    if (fs.existsSync(filePath)) {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                res.statusCode = 500;
                res.end('Internal Server Error');
            } else {
                // res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                res.end(data);
            }
        });
    } else {
        res.statusCode = 404;
        res.end('File Not Found');
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
    res.send('Hello World!');
});

// listen to check if server is running
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});


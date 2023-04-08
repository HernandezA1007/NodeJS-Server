// Antonio Hernandez
// INF 653
// Muvva
// 4 - 7 - 23

// Another example...
const http = require("http");
const path = require("path");
const fsPromises = require("fs").promises;
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/images/") && req.method === "GET") {
    const fileName = path.basename(req.url);

    const filePath = path.join(__dirname, "public", "images", fileName);
    if (fs.existsSync(filePath)) {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end("Internal Server Error");
        } else {
          res.setHeader("Content-Type", "image/jpg");
          res.end(data);
        }
      });
    } else {
      res.statusCode = 404;
      res.end("File not found");
    }
  } else {
    res.setHeader("Content-Type", "text/html");
    fs.readFile(path.join(__dirname, "views", "index.html"), (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Internal Server Error");
      } else {
        res.end(data);
      }
    });
  }
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
const http = require("http");
const fs = require("fs");
const hostname = "127.0.0.1";
const port = 3000;

let html;
let js;
let secrets;

fs.readFile("./index.html", (err, data) => {
  if (err) {
    throw err;
  }
  html = data;
});

fs.readFile("./index.js", (err, data) => {
  if (err) {
    throw err;
  }
  js = data;
});

fs.readFile("./secrets.js", (err, data) => {
  if (err) {
    throw err;
  }
  secrets = data;
});

const server = http.createServer((req, res) => {
  res.statusCode = 200;

  if (req.url.indexOf("index.js") != -1) {
    res.writeHeader(200, { "Content-Type": "text/javascript" });
    res.write(js);
    res.end();
    return;
  }

  if (req.url.indexOf("secrets.js") != -1) {
    res.writeHead(200, { "Content-Type": "text/javascript" });
    res.write(secrets);
    res.end();
    return;
  }

  res.writeHeader(200, { "Content-Type": "text/html" });
  res.write(html);
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

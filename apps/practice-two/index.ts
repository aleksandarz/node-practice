
const http = require("http");

const server = http.createServer((req: any, res: any) => {
  res.setHeader("Content-Type", "text/plain");

  if (req.url === "/") {
    res.statusCode = 200;
    res.end("Welcome to the main page");
  } else {
    res.statusCode = 404;
    res.end("Page Not Found");
  }

});

server.listen(3000);

console.log("Server is running at localhost - http://localhost:3000/");
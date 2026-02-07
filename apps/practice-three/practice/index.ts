
type NewsType = {
  title: string,
  description: string,
  createdAt: string,
}

const http = require("http");

const server = http.createServer((req: any, res: any) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  const myUrl = new URL(req.url, "http://localhost:8080");
  const news: NewsType[] = require("./news.json");

  if (myUrl.pathname === "/") {
    res.statusCode = 200;
    let articles = "";

    news.forEach((item: any) => {
      articles += `
        <article>
          <h2>${item.title}</h2>
          <p>${item.description}</p>
          <small>${item.createdAt}</small>
        </article>
      `;
    });

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>News</title>
        </head>
        <body>
          <h1>News</h1>
      
          ${articles}
      
        </body>
      </html>
      `;

    res.end("Welcome to the main page \n" + html);
  }
  else if (myUrl.pathname === "/api/news") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    res.end(JSON.stringify(news));
  }
  else if (myUrl.pathname === "/contact") {
    res.statusCode = 302;
    res.setHeader("Location", "/");
    res.end();
  }
  else if (myUrl.pathname === "/news") {
    const title = myUrl.searchParams.get("title");
    const foundTitle = news.find(item => item.title === title);

    if (foundTitle) {
      res.statusCode = 200;
      res.end("Title was found - " + foundTitle.title);
    } else {
      res.statusCode = 404;
      res.end("Title was not found");
    }
  }
  else {
    res.statusCode = 404;
    res.end("404 - Not Found");
  }
});

server.listen(8080);
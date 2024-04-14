const http = require("http");
const qr = require("qrcode-terminal");
const {voteRouteController, mainRouteController, gameRouteController} = require("./controllers/index");
const {defaultRouteController} = require("./controllers");

const PORT = 3005;
const HOST = "localhost";
const url = `http://${HOST}:${PORT}`

function generateQRCode(url) {
  qr.generate(url, { small: true });
}

async function startServer() {
  let chalk;
  try {
    // Use dynamic import to import chalk as an ES Module
    const chalkModule = await import("chalk");
    chalk = chalkModule.default;
  } catch (error) {
    // If dynamic import fails, fallback to requiring chalk as a CommonJS module
    chalk = require("chalk");
  }
  
  const server = http.createServer((req, res) => {
    const url = req.url;
    switch (url) {
      case "/":
        res.statusCode = 200;
        mainRouteController(res, "/index.html", ".html");
        break;
      case "/game":
        gameRouteController(res);
        break;
      case "/vote":
        voteRouteController(req, res);
        break;
      default:
        defaultRouteController(res, url);
    }
  });
  
  server.listen(PORT, () => {
    generateQRCode(url);
    console.log(
      chalk.whiteBright("Server is running on"), chalk.underline.cyan(PORT), chalk.whiteBright("port."),
      chalk.yellow("\nJoin now ☞"), chalk.underline.green(`${url}\n`)
    );
  });
}

// Call the async function to start the server
startServer().catch(error => {
  console.error("\nError starting server:", error);
  process.exit(1);
});

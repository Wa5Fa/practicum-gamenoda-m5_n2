const http = require("http");
const path = require("path");
const {voteRouteController, mainRouteController, gameRouteController} = require("./controllers/index");
const {defaultRouteController} = require("./controllers");

const PORT = 3005;

const server = http.createServer((req, res) => {
	const url = req.url;
	switch (url) {
		case "/":
			res.statusCode = 200;
			mainRouteController(res, "/index.html", '.html');
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

server.listen(PORT, () => console.log(`✅ - http://localhost:${PORT}\nServer was worked on PORT ${PORT}.`));

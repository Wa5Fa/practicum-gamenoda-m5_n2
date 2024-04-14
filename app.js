const http = require("http");
const path = require("path");
const {voteRouteController, mainRouteController, gameRouteController} = require("./controllers/index");
const {defaultRouteController} = require("./controllers");

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
			defaultRouteController(req, url);
	}
});

server.listen(3005, () => console.log("server was worked on PORT 3005"));

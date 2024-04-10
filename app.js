const http = require('http');
const path = require("path");
const {voteRouteController, mainRouteController, gameRouteController} = require('./controllers/index')
const {staticFile, mimeTypes} = require('./appModules/http-utils/index')

const server = http.createServer((req, res) => {
    const url = req.url;
    switch (url) {
        case '/':
            res.statusCode = 200;
            mainRouteController(res, '/index.html', '.html');
            break;
        case '/game':
            gameRouteController(res);
            break;
        case '/vote':
            voteRouteController(req, res);
            break;
        default:
            const extname = String(path.extname(url)).toLowerCase();
            if (extname in mimeTypes) {
                res.setHeader("Content-Type", mimeTypes[extname]);
                staticFile(res, url, extname);
            } else {
                res.statusCode = 404;
                res.end('Not Found');
            }
    }
});

server.listen(3005, () => console.log('server was worked on PORT 3005'));

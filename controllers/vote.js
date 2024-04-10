const {parseBody}= require('../appModules/http-utils/index');

async function voteRouteController(req, res) {
    if (req.method !== "POST") {
      res.statusCode = 404;
      res.end("Not Found");
    }
    parseBody(req, (err, body) => {
        if (err) {
          res.statusCode = 500;
          res.end("Internal Server Error");
        }
        console.log(body);
        res.statusCode = 200;
        res.end("Success!");
      });
  }

  module.exports = voteRouteController
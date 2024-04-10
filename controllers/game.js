const fs = require("fs");

async function gameRouteController(res) {
    fs.readFile("./dataset/rating.json", (err, ratingFile) => {
      if (err) {
        res.statusCode = 500;
        res.end("Internal Server Error");
      }
      const data = JSON.parse(ratingFile);
      const game = data[0];
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(game));
    });
  }

  module.exports = gameRouteController;
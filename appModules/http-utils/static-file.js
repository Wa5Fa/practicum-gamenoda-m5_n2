const fs = require("fs");
const path = require("path"); 
const mimeTypes = require('./mime-types');

function staticFile(res, filePath, ext) {
    
    const fullPath = path.join("./public", filePath);

    
    fs.access(fullPath, fs.constants.F_OK, (err) => {
        if (err) {
            res.statusCode = 404;
            res.end("Not Found");
            return;
        }

        
        res.setHeader("Content-Type", mimeTypes[ext] || "application/octet-stream");
        fs.readFile(fullPath, (err, data) => {
            if (err) {
                console.error(err);
                res.statusCode = 500;
                res.end("Internal Server Error");
            } else {
                res.end(data);
            }
        });
    });
}

module.exports = staticFile;

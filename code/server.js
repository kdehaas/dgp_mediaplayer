var http = require('http');
var fs = require('fs');
var url = require('url');

myDateTime = function () {
  return Date();
};


http.createServer(function (req, res) {
  var q = url.parse(req.url, true).query;
  if (req.url == '/index.html') {
    fs.readFile('index.html', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });

  } else if (req.url == '/script.js') {
    fs.readFile('script.js', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.write(data);
      res.end();
    });
  } else if (req.url.endsWith('.png')) {
    fs.readFile(req.url.substr(1), function (err, data) {
      try {
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.write(data);
        res.end();
      } catch{ }
    });
  } else if (req.url.endsWith('.mp4')) {
    fs.readFile(req.url.substr(1), function (err, data) {
      try {
        res.writeHead(200, { 'Content-Type': 'video/mp4' });
        res.write(data);
        res.end();
      } catch{ }
    });
  }

  if (q.folder != null) {
    var result = []
    var files = fs.readdirSync(q.folder);
    for (i in files) {
      var file = files[i];
      if (file.includes('.png')) {
        if (!result.includes(file)) {
          result.push(file.substring(0, file.lastIndexOf('.')));
        }
      }
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(result));
    res.end();
  }
}).listen(8080);



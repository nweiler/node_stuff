var fs = require('fs'),
    http = require('http'),
    util = require('util');
  
http.createServer(function(req, res) {
  res.write('This is a boring request...\n');
  res.end('Done');
  })
  .on('request', function(req, res) {
    res.write(util.format('A %s request was made...\n', req.method));
  })
  .listen(3000)

console.log('Server running at http://localhost:3000...');

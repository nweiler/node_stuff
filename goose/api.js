var async = require('async'),
    fs = require('fs'),
    http = require('http'),
    models = require('./models'),
    mongoose = require('mongoose'),
    MongoClient = require('mongodb').MongoClient,
    util = require('util');
  
mongoose.connect('mongodb://localhost/goose');
var db = mongoose.connection;
db.once('open', function callback() {

  http.createServer(function(req, res) {
    var name = req.url.split('/').pop();
    fs.createReadStream('./index.html').pipe(res);
    if (req.method == 'GET') {
      db.collection('guesses').find( { "name": name } ).toArray(function(e, results) {
        if (e || results.length == 0) { res.write('Error getting results: %s', e); res.end(); }
        else {
          async.each(results,
            function(r, cb) {
              res.write(JSON.stringify(r));
              cb();
            },
            function() {
              res.end();
          })
        }
      })
    } else if (req.method == 'POST') {
      db.collection('guesses').update( { 'name': name }, { $set: { 'date': new Date } },
        function(e, results) {
          if (e) console.log(error);
        res.end();
      });
    }
  })
  .on('request', function(req, res) {
    //res.write(util.format('A %s request was made...\n', req.method));
  })
  .listen(3000)
})

console.log('Server running at http://localhost:3000...');

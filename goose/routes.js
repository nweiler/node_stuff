var async = require('async'),
    fs = require('fs'),
    http = require('http'),
    models = require('./models'),
    mongoose = require('mongoose'),
    MongoClient = require('mongodb').MongoClient,
    util = require('util');
  
    mongoose.connect('mongodb://localhost/goose');
    var db = mongoose.connection;
    //db.on('error', console.log('error'));
    db.once('open', function callback() {
  
      http.createServer(function(req, res) {
        var name = req.url.split('/').pop();
        db.collection('cats').find( { "name": name } ).toArray(function(err, results) {
          async.each(results, function(r, cb) {
            res.write(util.format('Name: %s, ID: %s\n', r.name, r._id));
            cb();
          },
          function() {
            res.end();
          })
        })
      })
      .on('request', function(req, res) {
        res.write(util.format('A %s request was made...\n', req.method));
      })
      .listen(3000)

})
console.log('Server running at http://localhost:3000...');

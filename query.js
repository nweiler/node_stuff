var async = require('async'),
    fs = require('fs'),
    http = require('http'),
    mongoose = require('mongoose'),
    MongoClient = require('mongodb').MongoClient,
    util = require('util');
  
/*
    mongoose.connect('mongodb://localhost/test');
    // Create a new cat
    var Cat = mongoose.model('Cat', { name: String }),
        kitty1 = new Cat({ name: 'Felix' });
        kitty2 = new Cat({ name: 'Fritz' });
    kitty1.save(function(err) { if (err) console.log('Error: %s', err); })
    kitty2.save(function(err) { if (err) console.log('Error: %s', err); })
*/

MongoClient.connect('mongodb://localhost/cats', function(e, db) {
  if (e) console.log('Error connecting to db: %s', e);;

  http.createServer(function(req, res) {
    var name = req.url.split('/').pop();
    db.collection('cats').find( { "name": name } ).toArray(function(err, results) {
      async.each(results,
      function(r, cb) {
        res.write(util.format('Name: %s, ID: %s\n', r.name, r._id));
        cb();
      },
      function() {
        res.end('Done');
      })
    })
  })
  .on('request', function(req, res) {
    res.write(util.format('A %s request was made...\n', req.method));
  })
  .listen(3000)
})

console.log('Server running at http://localhost:3000...');

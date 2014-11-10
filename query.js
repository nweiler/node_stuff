var fs = require('fs'),
    http = require('http'),
    mongoose = require('mongoose'),
    MongoClient = require('mongodb').MongoClient,
    util = require('util');
  
/*
    mongoose.connect('mongodb://localhost/test');
    // Create a new cat
    var Cat = mongoose.model('Cat', { name: String }),
        kitty = new Cat({ name: 'Fritz' });
    kitty.save(function(err) {
      if (err) console.log('Error: %s', err);
    })
*/

MongoClient.connect('mongodb://127.0.0.1/test', function(err, db) {
  if (err) throw error;

  http.createServer(function(req, res) {
    var name = req.url.split('/').pop();
    db.collection('cats').find( { "name": name } ).toArray(function(err, results) {
      results.forEach(function(r) {
        res.write(util.format('Name: %s, ID: %s\n', r.name, r._id));
      })
      // This 'end' doesn't actually work as intended
      res.end();
    })
  })
  .on('request', function(req, res) {
    res.write(util.format('A %s request was made...\n', req.method));
  })
  .listen(3000)
})

console.log('Server running at http://localhost:3000...');

var fs = require('fs'),
    http = require('http'),
    mongoose = require('mongoose'),
    MongoClient = require('mongodb').MongoClient,
    util = require('util');
  
    mongoose.connect('mongodb://localhost/run');
    var db = mongoose.connection;
    db.on('error', console.log('error');
    db.once('open', function callback() {
  }
  
    var run = mongoose.model('run', { name: String }),
        kitty1 = new Cat({ name: 'Felix' });
        kitty2 = new Cat({ name: 'Fritz' });
    kitty1.save(function(err) { if (err) console.log('Error: %s', err); })
    kitty2.save(function(err) { if (err) console.log('Error: %s', err); })

MongoClient.connect('mongodb://localhost/test', function(err, db) {
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

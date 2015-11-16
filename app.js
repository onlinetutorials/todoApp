var express = require('express');
var http = require('http');
var app = express();

// public and views path
app.use('/bower_components', express.static('bower_components'));
app.use('/images', express.static('images'));
app.use('/public', express.static('public'));
app.use('/views', express.static('views'));
app.use('/ng', express.static('ng'));
app.use('/css', express.static('css'));
app.use('/fonts', express.static('fonts'));

// index file
var index = function (req, res) {
  res.sendFile('index.html', {root: __dirname});
};
app.use('/index.html', index);

//404 file
app.all('*', function (req, res) {
  // if you want
  if (req.url === '/') {
    return index(req, res);
  }
  // if you want
  res.sendFile('404.html', {root: __dirname});
});

//start server
http.createServer(app).listen(process.env.PORT || 3000);
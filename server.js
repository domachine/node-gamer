'use strict';

var http = require('http');
var log = require('util').log;
var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

http.createServer(app).listen(process.env.PORT || 3000, () => {
  log('Listening ...');
});

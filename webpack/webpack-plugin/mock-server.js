var express = require('express');
var returnData = require('./returnData.js.js');

module.exports = function({ config, port = 3000 }) {
  if (config) {
    const mockPort = port;
    var app = new express();

    app.use((req, res, next) => {
      req.config = config;
      next();
    });

    app.use(returnData);

    var server = app.listen(mockPort, function() {
      var host = server.address().address;
      var port = server.address().port;
      console.log('Mock server listening at http://%s:%s', host, port);
    });
  } else {
    console.log('No Config File!');
  }
};

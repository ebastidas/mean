'use strict';

// Load the module dependencies
var config = require('../config'),
    path = require('path'),
    fs = require('fs'),
    http = require('http'),
    https = require('https'),
    cookieParser = require('cookie-parser'),
    passport = require('passport'),
    socketio = require('socket.io'),
    session = require('express-session'),
    chalk = require('chalk'),
    MongoStore = require('connect-mongo')(session);

// Define the Socket.io configuration method
module.exports = function(app, db) {
  var server;
  if (config.secure === true) {
    // Load SSL key and certificate
    var privateKey = fs.readFileSync('./config/sslcerts/key.pem', 'utf8');
    var certificate = fs.readFileSync('./config/sslcerts/cert.pem', 'utf8');
    var options = {
      key: privateKey,
      cert: certificate
    };

    // Create new HTTPS Server
    server = https.createServer(options, app);
  } else {
    // Create a new HTTP server
    server = http.createServer(app);
  }
  // Create a new Socket.io server
  var io = socketio.listen(server);

  // Create a MongoDB storage object
  var mongoStore = new MongoStore({
      mongooseConnection: db.connection,
      collection: config.sessionCollection
  });

  // Intercept Socket.io's handshake request
  io.use(function (socket, next) {
        // Use the 'cookie-parser' module to parse the request cookies
        cookieParser(config.sessionSecret)(socket.request, {}, function (err) {
            // Get the session id from the request cookies
            var sessionId = socket.request.signedCookies['connect.sid'];
            
            // Use the mongoStorage instance to get the Express session information
            mongoStore.get(sessionId, function (err, session) {
                // Set the Socket.io session information
                socket.request.session = session;
                
                // Use Passport to populate the user details
                passport.initialize()(socket.request, {}, function () {
                    passport.session()(socket.request, {}, function () {
                        if (socket.request.user) {
                            // put connected user into a room for receiving direct socket messages
                            socket.join(socket.request.user.username, function (err) {
                                if (err) {
                                    // log room join error
                                    console.log('--');
                                    console.log(chalk.red('Room Join Error'));
                                    console.log(chalk.red('room:\t\t\t\t' + socket.request.user.username));
                                    console.log(chalk.red('\t' + err));
                                    console.log('--');
                                }
                                else {
                                    // log the successful room join
                                    console.log('--');
                                    console.log(chalk.green('Room Join'));
                                    console.log(chalk.green('room:\t\t\t\t' + socket.request.user.username));
                                    console.log(chalk.green('date:\t\t\t\t' + Date().toString()));
                                    console.log('--');
                                }
                            });
                            next(null, true);
                        } else {
                            next(new Error('User is not authenticated'), false);
                        }
                    });
                });
            });
        });
    });

  // Add an event listener to the 'connection' event
  io.on('connection', function(socket) {
    config.files.server.sockets.forEach(function(socketConfiguration) {
      require(path.resolve(socketConfiguration))(io, socket);
    });
  });

  return server;
};

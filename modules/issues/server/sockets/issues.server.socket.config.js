'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

// Create the Issue configuration
module.exports = function (io, socket) {
        
    // Send the Issue notification to all users with the 'admin' role
    socket.on('issueNotification', function (notification) {
        notification.created = Date.now();
        notification.profileImageURL = socket.request.user.profileImageURL;
        notification.username = socket.request.user.username;
                
        // get the list of admins that should receive this notification
        User.find({ roles: { $in: ['admin']} }).exec(function (err, users) {
            if (err) {
                // handle error
                console.log(err); // TODO: handle this error properly
            } else {
                // make sure we have admins that should receive this notification
                if (users) {                    
                    users.forEach(function (user) {
                        io.to(user.username).emit(notification.type, notification);
                        console.log('message sent to: ' + user.username);
                    });                    
                }
            }
        });

        
    });
};

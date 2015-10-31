﻿'use strict';

var _ = require('lodash'),
  config = require('../config'),
  mongoose = require('mongoose'),
  mg = require('./mongoose'),
  jwt = require('jsonwebtoken'),
  chalk = require('chalk');

// build token auth service
var tokenAuth = {
  signToken: signAuthToken,
  authorize: authorizeRequest
};

// export the token auth service
module.exports = tokenAuth;

// Sign a token
function signAuthToken (user) {
  return new Promise(function (resolve, reject) {
    try {
      var expiration = Date.now() + (config.tokenAuth.expiresInSeconds * 1000);

      var payload = {
        user: user,
        expiration: expiration
      };

      var options = {
        expiresIn: config.tokenAuth.expiresInSeconds
      };

      var tokenInfo = {
        token: jwt.sign(payload, config.tokenAuth.secret, options),
        expiration: expiration
      };

      resolve(tokenInfo);

    } catch (err) {
      reject(err);
    }
  });
}

function authorizeRequest (req, res, next) {
  if (req.headers.authorization) {

    var bearer = req.headers.authorization.split(' ');
    var token = bearer[1];

    // verify the token and get the decoded data
    jwt.verify(token, config.tokenAuth.secret, function (err, decodedToken) {
      if (err) return next(err);

      // load models
      mg.loadModels();

      var User = mongoose.model('User');

      // find the user that was decoded from the token
      User.findOne({
        _id: decodedToken.user._id
      }).exec(function (err, user) {
        if (err) {
          return next(err);
        } else if (!user) {
          return next(new Error('Failed to load User ' + decodedToken.user._id));
        }

        req.user = user;

        next();
      });
    });
  } else {
    next();
  }
}

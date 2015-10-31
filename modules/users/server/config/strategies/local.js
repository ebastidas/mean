'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
  path = require('path'),
  config = require(path.resolve('./config/config')),
  tokenAuth = require(path.resolve('./config/lib/token-auth')),
  LocalStrategy = require('passport-local').Strategy,
  User = require('mongoose').model('User');

module.exports = function () {
  // Use local strategy
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function (username, password, done) {
    User.findOne({
      username: username.toLowerCase()
    }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user || !user.authenticate(password)) {
        return done(null, false, {
          message: 'Invalid username or password'
        });
      }

      // clear token data
      user.auth.token = undefined;
      user.auth.expires = undefined;

      // handle token auth
      tokenAuth.signToken(user)
      .then(function (tokenInfo) {

        user.auth.token = tokenInfo.token;
        user.auth.expires = tokenInfo.expiration;

        user.save(function (err) {
          if (err) {
            return done(err);
          } else {
            return done(null, user);
          }
        });
      })
      .catch(function (err) {
        return done(err);
      });
    });
  }));
};

'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', ['$window', '$localStorage',
  function ($window, $localStorage) {
    var auth = {
      user: $window.user || getUserFromToken()
    };

    return auth;

    // Private members

    function urlBase64Decode(str) {
      var output = str.replace('-', '+').replace('_', '/');
      switch (output.length % 4) {
        case 0:
          break;
        case 2:
          output += '==';
          break;
        case 3:
          output += '=';
          break;
        default:
          throw 'Illegal base64url string!';
      }
      return window.atob(output);
    }

    function getUserFromToken() {
      var token = $localStorage.token;
      var decoded = {};
      if (typeof token !== 'undefined' && token !== null) {
        var encoded = token.split('.')[1];
        decoded = JSON.parse(urlBase64Decode(encoded));
      }

      return decoded.user;
    }
  }
]);

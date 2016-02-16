'use strict';
const pathToRegexp = require('path-to-regexp');

module.exports = function route(def, callback){
  var keys = [];
  var regexp = pathToRegexp(def, keys);
  return function(req, res, next){
    if(regexp.test(req.url)){
      req.params = {};
      var matchs = regexp.exec(req.url).slice(1);
      keys.forEach(function(key, i){
        req.params[ key.name ] = matchs[ i ];
      });
      callback.apply(this, arguments);
    }
  }
};

'use strict';
const pathToRegexp = require('path-to-regexp');

module.exports = function route(method, path, callback){
  if(!callback){
    callback = path;
    path = method;
    method = null;
  }
  if(method){
    method = method.toUpperCase();
  }
  var keys = [];
  var regexp = pathToRegexp(path, keys);
  return function(req, res, next){
    if((method ? (method == req.method) : true) &&  regexp.test(req.url)){
      req.params = {};
      var matchs = regexp.exec(req.url).slice(1);
      keys.forEach(function(key, i){
        req.params[ key.name ] = matchs[ i ];
      });
      callback.apply(this, arguments);
    }else{
      next();
    }
  }
};

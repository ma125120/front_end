
var jwt = require('jsonwebtoken');

const secret = 'asdsdasda';
var _jwt = {};

_jwt.sign = function(payload, secretOrPrivateKey = secret, options = {},  callback) {
  secretOrPrivateKey = secretOrPrivateKey || secret;
  return jwt.sign(JSON.stringify({ 
    data: payload,
    exp: options.expiresIn || options.exp || Math.floor(Date.now() / 1000) + ( 60 * 60 * 24 ),
    nbf: options.notBefore || options.nbf,
    aud: options.audience || options.aud,
    sub: options.subject || options.sub,
    iss: options.issuer || options.sub,
  }), secretOrPrivateKey);
}

_jwt.verify = function(payload, secretOrPrivateKey = secret, options = {}, callback) {
  secretOrPrivateKey = secretOrPrivateKey || secret;

  let obj = {
    errmsg: '缓存已过期',
  }
  try {
    obj = jwt.verify(payload, secretOrPrivateKey).data;
    
  } catch(err) {

  }
  return obj;
}

module.exports = _jwt;

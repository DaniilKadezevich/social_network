const jwt = require('jsonwebtoken');
const config = require('../config.json');

module.exports.generateToken = function generateToken(tokenInfo) {
   return jwt.sign(tokenInfo, config.secret);
};
module.exports.checkToken = function verifyToken(token, callback) {
    return jwt.verify(token, config.secret, (error, data) => {
       callback(error, data);
    });
};
const {checkToken} = require('../jwt');
const getPosts = require('./getPosts');
const { sendErrorMessage } = require('../functions');

module.exports = function (token, res) {
    checkToken(token, (error, data) => {
        if (error) {
            sendErrorMessage('Invalid token', res);
            return;
        }
        let query = {};
        getPosts(query, res)
    });
};
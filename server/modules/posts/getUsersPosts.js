const {checkToken} = require('../jwt');
const connectToTheDB = require('../connectToTheDB');
const getPosts = require('./getPosts');
const { ObjectId } = require('mongodb');
const { sendErrorMessage } = require('../functions');

module.exports = function (token, index, res, _id) {
    checkToken(token, (error, data) => {
        if (error) {
            sendErrorMessage('Invalid token', res);
            return;
        }

        let query = { author: _id};
        getPosts(query, index, res)
    });
};
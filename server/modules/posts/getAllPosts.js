const {checkToken} = require('../jwt');
const connectToTheDB = require('../connectToTheDB');
const getPosts = require('./getPosts');
const { ObjectId } = require('mongodb');
const { sendErrorMessage } = require('../functions');

module.exports = function (token, res) {
    checkToken(token, (error, data) => {
        if (error) {
            sendErrorMessage('Invalid token', res);
            return;
        }
        connectToTheDB(function (dbo, db) {
            dbo.collection('users').findOne({ _id: ObjectId(data._id)}, { fields: {friends: 1}}, (err, r) => {
                db.close();
                let query = { author: {$in: [...r.friends, data._id]}};
                getPosts(query, res)
            });
        });
    });
};
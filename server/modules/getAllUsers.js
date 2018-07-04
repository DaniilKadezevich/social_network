const {checkToken} = require('./jwt');
const connectToTheDB = require('./connectToTheDB');
const { ObjectId } = require('mongodb');
const getUsers = require('./getUsers');
const { sendErrorMessage } = require('./functions');

module.exports = function(token, regexp, res, index) {
    checkToken(token, (error, data) => {
        if (error) {
            sendErrorMessage('Invalid token', res);
            return;
        }
        connectToTheDB(function (dbo, db) {
            getUsers(dbo, db, { _id: { $ne: ObjectId(data._id)}, name: {$regex: regexp}}, res, index);
        });
    });
};

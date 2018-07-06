const {checkToken} = require('../jwt');
const connectToTheDB = require('../connectToTheDB');
const { ObjectId } = require('mongodb');
const getUsers = require('../getUsers');
const { sendErrorMessage } = require('../functions');

module.exports = function(token, res) {
    checkToken(token, (error, data) => {
        if (error) {
            sendErrorMessage('Invalid token', res);
            return;
        }

        connectToTheDB(function (dbo, db) {
            dbo.collection('users').findOne({_id: ObjectId(data._id)}, function (err, result) {
                if (!result) {
                    sendErrorMessage('Can\'t find user', res);
                    db.close();
                    return;
                }

                let ids = result.friends.map(_id => {
                    return ObjectId(_id);
                });

                getUsers(dbo, db, { _id: {$in: ids}}, res);
            });
        });
    });
};

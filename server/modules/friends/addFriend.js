const {checkToken} = require('../jwt');
const connectToTheDB = require('../connectToTheDB');
const { ObjectId } = require('mongodb');
const uploadUser = require('./uploadUser');
const { sendErrorMessage } = require('../functions');

module.exports = function(token, _id, res) {
    checkToken(token, (error, data) => {
        if (error) {
            sendErrorMessage('Invalid token', res);
            return;
        }

        connectToTheDB(function (dbo, db) {
            dbo.collection('users').findOne({ _id: ObjectId(data._id)}, { fields: {friends: 1}}, (err, r) => {
                if (_id === data._id) {
                    sendErrorMessage('You can\'t add yourself to your friends.', res);
                    db.close();
                    return;
                }

                if (r.friends.includes(_id)) {
                    sendErrorMessage('This user is already your friend.', res);
                    db.close();
                    return;
                }

                dbo.collection('users').update({ _id: ObjectId(_id) }, { $push: { friends: data._id} });
                dbo.collection('users').update({ _id: ObjectId(data._id) }, { $push: { friends: _id} }, (err, r) => {
                    uploadUser(token, _id, res)
                });
                db.close();
            });

        });
    });
};
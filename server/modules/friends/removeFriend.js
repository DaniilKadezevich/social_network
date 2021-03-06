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
            dbo.collection('users').update({ _id: ObjectId(_id) }, {$pull: {friends: data._id}});
            dbo.collection('users').update({ _id: ObjectId(data._id) }, {$pull: {friends: _id}}, (err, r) => {
                uploadUser(token, _id, res)
            });
            db.close();
        });
    });
};
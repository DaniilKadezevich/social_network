const {checkToken} = require('../jwt');
const { ObjectId } = require('mongodb');
const connectToTheDB = require('../connectToTheDB');
const { sendErrorMessage } = require('../functions');

module.exports = function (token, _id, res) {
    checkToken(token, (err, data) => {
        if (err) {
            sendErrorMessage('Invalid token', res);
            return;
        }

        connectToTheDB(function (dbo, db) {
            dbo.collection('users').findOne({ _id: ObjectId(data._id)}, (err, result) => {
                if (!result) {
                    sendErrorMessage('Can\'t find your profile', res);
                    db.close();
                    return;
                }
                let isFriend = result.friends.includes(_id);

                dbo.collection('users').findOne({ _id: ObjectId(_id) }, { fields: {password: 0, friends: 0} }, (err, result) => {
                    if (!result) {
                        sendErrorMessage('No user with this id', res);
                        db.close();
                        return;
                    }

                    res.send({
                        user: {...result, isFriend },
                        isError: false,
                    });
                    db.close();
                });
            });
        });
    });
};

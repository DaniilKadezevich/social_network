const {checkToken} = require('../jwt');
const { ObjectId } = require('mongodb');
const connectToTheDB = require('../connectToTheDB');

module.exports = function (token, _id, res) {
    checkToken(token, (err, data) => {
        if (err) {
            res.send({
                message: 'Invalid token',
                isError: false,
            });

            return;
        }

        connectToTheDB(function (dbo, db) {
            dbo.collection('users').findOne({ _id: ObjectId(data._id)}, (err, result) => {
                let isFriend = result.friends.includes(_id);

                dbo.collection('users').findOne({ _id: ObjectId(_id) }, { fields: {password: 0, friends: 0} }, (err, result) => {
                    if (!result) {
                        res.send({
                            message: 'No user with this id',
                            isError: true,
                        });
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

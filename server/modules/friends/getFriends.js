const {checkToken} = require('../jwt');
const connectToTheDB = require('../connectToTheDB');
const { ObjectId } = require('mongodb');
const getUsers = require('../getUsers');

module.exports = function(token, res) {
    checkToken(token, (error, data) => {
        if (error) {
            res.send({
                message: 'Invalid token',
                isError: false,
            });

            return;
        }

        connectToTheDB(function (dbo, db) {
            dbo.collection('users').findOne({_id: ObjectId(data._id)}, function (err, result) {
                if (err) {
                    res.send({
                        message: 'error',
                        isError: true,
                    });

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

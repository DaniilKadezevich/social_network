const {checkToken} = require('./jwt');
const connectToTheDB = require('./connectToTheDB');
const { ObjectId } = require('mongodb');

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

                let ids = result.friends.map(_id => {
                    return ObjectId(_id);
                });

                dbo.collection('users').find({ _id: {$in: ids} }, { fields: {password: 0, middleName: 0, email: 0} }).toArray(function (err, r) {

                    res.send({
                        friends: r,
                        isError: false,
                    });

                    db.close();
                });
            });
        });
    });
};

const {checkToken} = require('./jwt');
const connectToTheDB = require('./connectToTheDB');
const { ObjectId } = require('mongodb');

module.exports = function(token, regexp, res) {
    checkToken(token, (error, data) => {
        if (error) {
            res.send({
                message: 'Invalid token',
                isError: false,
            });

            return;
        }

        connectToTheDB(function (dbo, db) {
            dbo.collection('users').find({ _id: { $ne: ObjectId(data._id)}, name: {$regex: regexp}}, { fields: { password: 0, middleName: 0, email: 0 }}).toArray(function(err, result) {

                res.send({
                    users: result,
                    isError: false,
                });
                db.close();
            });
        });
    });
};

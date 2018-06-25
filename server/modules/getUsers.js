const {checkToken} = require('./jwt');
const connectToTheDB = require('./connectToTheDB');
const ObjectId = require('mongodb').ObjectId;

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
            dbo.collection('users').find({ _id: { $ne: ObjectId(data._id)}}, { fields: {_id: 0, password: 0, middleName: 0, email: 0 }}).toArray(function(err, result) {

                console.log(result);
                res.send({
                    users: result,
                    isError: false,
                });
                db.close();
            });
        });
    });
};

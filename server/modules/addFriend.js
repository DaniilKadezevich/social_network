const {checkToken} = require('./jwt');
const connectToTheDB = require('./connectToTheDB');
const { ObjectId } = require('mongodb');
const uploadUser = require('./uploadUser');

module.exports = function(token, _id, res) {
    checkToken(token, (error, data) => {
        if (error) {
            res.send({
                message: 'Invalid token',
                isError: true,
            });

            return;
        }

        connectToTheDB(function (dbo, db) {
            dbo.collection('users').update({ _id: ObjectId(_id) }, { $push: { friends: data._id} });
            dbo.collection('users').update({ _id: ObjectId(data._id) }, { $push: { friends: _id} }, (err, r) => {
                uploadUser(token, _id, res)
            });
            db.close();
        });
    });
};
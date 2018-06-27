const {checkToken} = require('./jwt');
const connectToTheDB = require('./connectToTheDB');
const { ObjectId } = require('mongodb');

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
            let query = { _id: ObjectId(data._id) };

            dbo.collection('users').update({_id: ObjectId(_id)}, {$push: { friends: data._id}});
            dbo.collection('users').update(query, {$push: { friends: _id}});
            res.send({
                message: 'Updated 1',
                isError: false,
            });
            db.close();
        });
    });
};
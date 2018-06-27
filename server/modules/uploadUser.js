const {checkToken} = require('./jwt');
const getUser = require('./getUser');
const { ObjectId } = require('mongodb');
const connectToTheDB = require('./connectToTheDB');

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
                if (result.friends.includes(_id)) {
                    console.log(true);
                }
                db.close();
            })
        });

        let query = { _id: ObjectId(_id) };

        getUser(query, res);
    });
};

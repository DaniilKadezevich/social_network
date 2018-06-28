const {checkToken} = require('./jwt');
const connectToTheDB = require('./connectToTheDB');
const { ObjectId } = require('mongodb');
const getUsers = require('./getUsers');

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
            getUsers(dbo, db, { _id: { $ne: ObjectId(data._id)}, name: {$regex: regexp}}, res);
        });
    });
};

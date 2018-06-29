const {checkToken} = require('./jwt');
const getUser = require('./getUser');
const ObjectId = require('mongodb').ObjectId;

module.exports = function (token, res) {
    checkToken(token, (error, data) => {
        if (error) {
            res.send({
                message: 'Invalid token',
                isError: false,
            });

            return;
        }

        let query = { _id: ObjectId(data._id) };

        getUser(query, res);
    });
};

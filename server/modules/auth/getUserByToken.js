const { checkToken } = require('../jwt');
const getUser = require('../getUser');
const { ObjectId } = require('mongodb');
const { sendErrorMessage } = require('../functions');

module.exports = function (token, res) {
    checkToken(token, (error, data) => {
        if (error) {
            sendErrorMessage('Invalid token', res);
            return;
        }

        let query = { _id: ObjectId(data._id) };

        getUser(query, res);
    });
};

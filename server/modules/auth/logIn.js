const connectToTheDB = require('../connectToTheDB');
const bcrypt = require('bcrypt');
const { generateToken } = require('../jwt');
const { sendErrorMessage } = require('../functions');
const i18n = require("i18n");

module.exports = function (userInfo, res) {
    connectToTheDB(function(dbo, db) {

        let query = {email: userInfo.email};

        dbo.collection('users').findOne(query, { fields: {friends: 0} }, (err, result) => {
            if (!result) {
                sendErrorMessage(i18n.__('There is no user with this email.'), res);
                db.close();
                return;
            }

            bcrypt.compare(userInfo.password, result.password, function(err, valid) {
                if (!valid) {
                    sendErrorMessage(i18n.__('Invalid password'), res);
                    db.close();
                    return;
                }

                let token = generateToken({ _id: result._id });

                let response = {
                    message: i18n.__('Welcome back'),
                    user: {...result, password: undefined},
                    isError: false,
                    token
                };

                res.send(response);
                db.close();

            });
        });
    });
};

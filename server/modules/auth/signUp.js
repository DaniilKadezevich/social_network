const generatePassword = require('../generatePassword');
const connectToTheDB = require('../connectToTheDB');
const formValidation = require('../formValidation');
const bcrypt = require('bcrypt');
const { generateToken } = require('../jwt');
const { sendErrorMessage } = require('../functions');
const i18n = require("i18n");

module.exports = function (userObj, res) {
    userObj.email = userObj.email.toLowerCase();

    if (!formValidation(userObj)) {
        sendErrorMessage(i18n.__('Invalid data'), res);
        return;
    }

    let password = generatePassword();

    connectToTheDB(function(dbo, db) {
        let query = {email: userObj.email};

        dbo.collection("users").findOne(query, function (err, result) {
            if (result) {
                sendErrorMessage(i18n.__('User with this email is already registered'), res);
                db.close();
                return;
            }

            bcrypt.hash(password, 10, function(err, hash) {
                dbo.collection("users").insertOne({...userObj, password: hash, friends: [], gallery: []}, function(err, result) {
                    if (err) {
                        sendErrorMessage(i18n.__('Can\'t add user'), res);
                        return;
                    }

                    let _id = result.ops[0]._id;
                    let token = generateToken({ _id });

                    let user = {...userObj, password, _id};

                    let response = {
                        message: `${i18n.__('You have successfully sign in. Your password')} ${password}`,
                        user,
                        isError: false,
                        token,
                    };
                    res.send(response);
                    db.close();
                });
            });
        });
    });
};
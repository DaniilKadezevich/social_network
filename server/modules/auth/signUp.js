const generatePassword = require('../generatePassword');
const connectToTheDB = require('../connectToTheDB');
const formValidation = require('../formValidation');
const bcrypt = require('bcrypt');
const { generateToken } = require('../jwt');
const { sendErrorMessage } = require('../functions');

module.exports = function (userObj, res) {
    userObj.email = userObj.email.toLowerCase();

    if (!formValidation(userObj)) {
        sendErrorMessage('Invalid data', res);
        return;
    }

    let password = generatePassword();

    connectToTheDB(function(dbo, db) {
        let query = {email: userObj.email};

        dbo.collection("users").findOne(query, function (err, result) {
            if (result) {
                sendErrorMessage('User with this email is already registered', res);
                db.close();
                return;
            }

            bcrypt.hash(password, 10, function(err, hash) {
                dbo.collection("users").insertOne({...userObj, password: hash, friends: []}, function(err, result) {
                    if (err) {
                        sendErrorMessage('Can\'t add user', res);
                        return;
                    }

                    let _id = result.ops[0]._id;
                    let token = generateToken({ _id });

                    let user = {...userObj, password, _id};

                    let response = {
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
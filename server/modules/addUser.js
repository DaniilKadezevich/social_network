const generatePassword = require('./generatePassword');
const connectToTheDB = require('./connectToTheDB');
const regFormValidation = require('./regFormValidation');
const bcrypt = require('bcrypt');
const {generateToken} = require('./jwt');

module.exports = function (userObj, res) {
    userObj.email = userObj.email.toLowerCase();

    if (!regFormValidation(userObj)) {

        let response = {
            message: 'Invalid data',
            isError: true,
        };

        res.send(response);
        return;
    }

    let password = generatePassword();

    connectToTheDB(function(dbo, db) {
        let query = {email: userObj.email};

        dbo.collection("users").findOne(query, function (err, result) {
            if (result) {
                let response = {
                    message: 'User with this email is already registered',
                    isError: true
                };

                res.send(response);
                db.close();
                return;
            }

            bcrypt.hash(password, 10, function(err, hash) {
                dbo.collection("users").insertOne({...userObj, password: hash}, function(err, result) {
                    if (err) throw err;

                    let token = generateToken({ email: result.ops[0].email});

                    let user = {...userObj, password};
                    console.log(user);
                    let response = {
                        user,
                        isError: false,
                        token
                    };
                    res.send(response);
                    db.close();
                });
            });
        });
    });
};
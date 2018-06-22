const connectToTheDB = require('./connectToTheDB');
const bcrypt = require('bcrypt');
const {generateToken} = require('./jwt');

module.exports = function (userInfo, res) {
    connectToTheDB(function(dbo, db) {
        let query = {email: userInfo.email};

        dbo.collection('users').findOne(query, (err, result) => {
            if (!result) {
                let response = {
                    message: 'There is no user with this email',
                    isError: true,
                };
                res.send(response);
                db.close();
                return;
            }

            bcrypt.compare(userInfo.password, result.password, function(err, valid) {
                if (!valid) {
                    let response = {
                        message: 'Invalid password',
                        isError: true,
                    };

                    res.send(response);
                    db.close();
                    return;
                }

                let token = generateToken({ email: result.email });

                let response = {
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
